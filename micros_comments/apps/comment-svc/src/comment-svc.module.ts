import { Module } from '@nestjs/common';
import { CommentSvcController } from './comment-svc.controller';
import { CommentSvcService } from './comment-svc.service';

@Module({
  imports: [],
  controllers: [CommentSvcController],
  providers: [CommentSvcService],
})
export class CommentSvcModule {}
