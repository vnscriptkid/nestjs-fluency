import { Controller, Get } from '@nestjs/common';
import { CommentSvcService } from './comment-svc.service';

@Controller()
export class CommentSvcController {
  constructor(private readonly commentSvcService: CommentSvcService) {}

  @Get()
  getHello(): string {
    return this.commentSvcService.getHello();
  }
}
