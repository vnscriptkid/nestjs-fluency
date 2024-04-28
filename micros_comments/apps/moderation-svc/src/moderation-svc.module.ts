import { Module } from '@nestjs/common';
import { ModerationSvcController } from './moderation-svc.controller';
import { ModerationSvcService } from './moderation-svc.service';

@Module({
  imports: [],
  controllers: [ModerationSvcController],
  providers: [ModerationSvcService],
})
export class ModerationSvcModule {}
