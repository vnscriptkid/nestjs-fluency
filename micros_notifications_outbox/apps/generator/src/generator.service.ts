import { Inject, Injectable, Logger } from '@nestjs/common';
import { NOTIFICATION_SERVICE } from './constants';
import { Cron, CronExpression } from '@nestjs/schedule';
import { randomBytes } from 'crypto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class GeneratorService {
  private readonly logger = new Logger(GeneratorService.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationSvc: ClientProxy,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  generateNotifications() {
    const data = {
      message: 'Hello World! ' + randomBytes(8).toString('hex'),
      to: 'john@gmail.com',
      createdAt: new Date(),
    };
    this.notificationSvc.emit('notification.created', data);

    this.logger.log('Notification sent: ', data);
  }
}
