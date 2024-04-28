import { Controller, Get } from '@nestjs/common';
import { ModerationSvcService } from './moderation-svc.service';

@Controller()
export class ModerationSvcController {
  constructor(private readonly moderationSvcService: ModerationSvcService) {}

  @Get()
  getHello(): string {
    return this.moderationSvcService.getHello();
  }
}
