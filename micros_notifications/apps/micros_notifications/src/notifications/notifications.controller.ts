import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('notifications')
export class NotificationsController {
  private readonly logger = new Logger(NotificationsController.name);

  @EventPattern('notification.created')
  create(@Payload() data: unknown) {
    this.logger.log(data);
  }
}
