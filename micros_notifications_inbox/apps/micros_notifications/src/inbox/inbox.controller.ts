import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inbox } from './entities/inbox.entity';
import { Repository } from 'typeorm';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('inbox')
export class InboxController {
  constructor(
    @InjectRepository(Inbox)
    private readonly inboxRepo: Repository<Inbox>,
  ) {}

  @EventPattern('notification.created')
  async handleNotificationCreated(
    @Payload() data: unknown,
    @Ctx() ctx: RmqContext,
  ) {
    const msg = ctx.getMessage();

    // Store inbox
    const inbox = await this.inboxRepo.findOne({
      where: {
        messageId: msg.properties.messageId,
        pattern: ctx.getPattern(),
      },
    });

    if (inbox && inbox.status === 'processed') {
      return;
    }

    if (!inbox) {
      const inbox = this.inboxRepo.create({
        messageId: msg.properties.messageId,
        pattern: ctx.getPattern(),
        status: 'pending',
        payload: data,
      });

      await this.inboxRepo.save(inbox);
    }

    // ack manually
    const channel = ctx.getChannelRef();
    channel.ack(msg);
  }
}
