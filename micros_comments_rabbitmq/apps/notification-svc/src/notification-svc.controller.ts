import { Controller, Get, Logger } from '@nestjs/common';
import { NotificationSvcService } from './notification-svc.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

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
  async handleNotificationCreated(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    if (originalMsg.fields.redelivered) {
      this.logger.log('Message redelivered: #' + data?.payload?.id);
    }

    try {
      this.sendNotification(data);
      channel.ack(originalMsg);
      this.logger.log('Message acked: #' + data?.payload?.id);
    } catch (error) {
      this.logger.error(`Error: ${error.message}`);
      channel.nack(originalMsg);
      this.logger.log('Message nacked: #' + data?.payload?.id);
    }
  }

  sendNotification(data: any) {
    // Randomly throw an error
    if (Math.random() < 0.5) {
      throw new Error('Random error for message #' + data?.payload?.id);
    } else {
      this.logger.log(
        `Notification created #${data?.payload?.id}: ${JSON.stringify(data)}`,
      );
    }
  }
}
