import { Controller, Get } from '@nestjs/common';
import { NotificationSvcService } from './notification-svc.service';

@Controller()
export class NotificationSvcController {
  constructor(private readonly notificationSvcService: NotificationSvcService) {}

  @Get()
  getHello(): string {
    return this.notificationSvcService.getHello();
  }
}
