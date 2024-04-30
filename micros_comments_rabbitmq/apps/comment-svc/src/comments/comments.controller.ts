import { Body, Controller, Get, Inject, Logger, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { ClientProxy } from '@nestjs/microservices';
import { MODERATION_SVC, NOTIFICATION_SVC } from '../constants';
import { lastValueFrom } from 'rxjs';
import { CommentStatus } from './entities/comment.entity';

@Controller('comments')
export class CommentsController {
  private readonly logger = new Logger(CommentsController.name);

  constructor(
    private readonly commentsService: CommentsService,
    @Inject(MODERATION_SVC)
    private readonly moderationService: ClientProxy,

    @Inject(NOTIFICATION_SVC)
    private readonly notificationService: ClientProxy,
  ) {}

  @Post()
  async createComment(@Body() body: CreateCommentDto) {
    const comment = await this.commentsService.createComment(body);

    this.logger.log(`Comment created: ${JSON.stringify(comment)}`);

    const resp = await lastValueFrom(
      this.moderationService.send('comment.moderate', {
        id: comment.id,
        text: comment.text,
      }),
    );

    this.logger.log(`Moderation response: ${JSON.stringify(resp)}`);

    let commentStatus = CommentStatus.INACTIVE;

    switch (resp.result) {
      case 'valid':
        commentStatus = CommentStatus.ACTIVE;
        break;
      case 'invalid':
        commentStatus = CommentStatus.BANNED;
        break;
      default:
        throw new Error('Invalid moderation result: ' + JSON.stringify(resp));
    }

    await this.commentsService.updateCommentStatus(comment.id, commentStatus);

    this.logger.log(`Comment status updated: ${commentStatus}`);

    const output = { ...comment, status: commentStatus };

    await this.notificationService.emit('notification.created', {
      type: 'comment.created',
      payload: output,
    });

    this.logger.log(`Notification sent: ${JSON.stringify(output)}`);

    return output;
  }

  @Get()
  getComments() {
    return this.commentsService.getActiveComments();
  }
}
