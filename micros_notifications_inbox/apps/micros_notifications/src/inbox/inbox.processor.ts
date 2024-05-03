import { Injectable, Logger } from '@nestjs/common';
import { Inbox } from './entities/inbox.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InboxService } from './inbox.service';
import { InappNotification } from '../notifications/entities/notification';

@Injectable()
export class InboxProcessor {
  private readonly logger = new Logger(InboxProcessor.name);

  constructor(private readonly inboxService: InboxService) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async pollInbox() {
    this.logger.log('Polling inbox...');

    this.inboxService.processPendingInboxes(async (inboxes, manager) => {
      const inboxRepo = manager.getRepository(Inbox);
      const inappNotificationRepo = manager.getRepository(InappNotification);
      for (const inbox of inboxes) {
        this.logger.log(`.Processing inbox #${inbox.id}`);

        const randomNum = Math.floor(Math.random() * 10000000);

        const inappNotificaiton = inappNotificationRepo.create({
          title: 'Hello World ' + randomNum,
          body: 'This is a notification',
          userId: 1,
        });

        await inappNotificationRepo.save(inappNotificaiton);

        inbox.status = 'processed';
        await inboxRepo.save(inbox);

        this.logger.log(`>Processed inbox #${inbox.id}`);
      }
    });
  }
}
