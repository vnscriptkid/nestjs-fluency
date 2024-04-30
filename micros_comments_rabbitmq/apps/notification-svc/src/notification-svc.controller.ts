import { Controller, Get, Logger } from '@nestjs/common';
import { NotificationSvcService } from './notification-svc.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationSvcController {
  private readonly logger = new Logger(NotificationSvcController.name);

  constructor(
    private readonly notificationSvcService: NotificationSvcService,
  ) {}

  @Get()
  getHello(): string {
    return this.notificationSvcService.getHello();
  }

  @EventPattern('notification.created')
  async handleNotificationCreated(@Payload() data: unknown) {
    this.logger.log(`Notification created: ${JSON.stringify(data)}`);
  }
}
