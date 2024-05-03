import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OutboxService } from './outbox.service';
import { NOTIFICATION_SERVICE } from '../constants';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OutboxProcessor {
  private readonly logger = new Logger(OutboxProcessor.name);

  constructor(
    private readonly outboxService: OutboxService,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationSvc: ClientProxy,
  ) {}

  @Cron(CronExpression.EVERY_SECOND)
  async processOutbox() {
    const outboxes = await this.outboxService.getUnprocessed(
      NOTIFICATION_SERVICE.description,
      'notification.created',
    );

    if (!outboxes.length) {
      this.logger.log('No outbox to process');
      return;
    }

    this.logger.log(`....Processing ${outboxes.length} outboxes`);

    for (const outbox of outboxes) {
      this.logger.log(`..Processing outbox #${outbox.id}`);
      this.notificationSvc.emit(outbox.target, outbox.payload);
      await this.outboxService.markAsProcessed(outbox.id);
      this.logger.log(`>>Processed outbox #${outbox.id}`);
    }
  }
}
