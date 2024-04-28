import { Controller, Get, Logger } from '@nestjs/common';
import { ModerationSvcService } from './moderation-svc.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ModerationSvcController {
  private readonly logger = new Logger(ModerationSvcController.name);

  constructor(private readonly moderationSvcService: ModerationSvcService) {}

  @Get()
  getHello(): string {
    return this.moderationSvcService.getHello();
  }

  @MessagePattern('comment.moderate')
  moderateComment(@Payload() body: unknown) {
    this.logger.log(`Moderating comment: ${JSON.stringify(body)}`);

    const results = ['valid', 'invalid'];

    // random result
    // [0, 1) * 2 = [0, 2) = [0, 1]
    const idx = Math.floor(Math.random() * results.length);

    const resp = {
      result: results[idx],
    };

    this.logger.log(`Moderation result: ${JSON.stringify(resp)}`);

    return resp;
  }
}
