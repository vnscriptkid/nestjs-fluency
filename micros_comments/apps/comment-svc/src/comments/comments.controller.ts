import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  createComment(@Body() body: CreateCommentDto) {
    return this.commentsService.createComment(body);
  }

  @Get()
  getComments() {
    return this.commentsService.getActiveComments();
  }
}
