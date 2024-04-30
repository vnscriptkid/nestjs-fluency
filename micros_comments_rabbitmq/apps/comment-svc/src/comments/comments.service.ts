import { Injectable, Logger } from '@nestjs/common';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment, CommentStatus } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  private readonly logger = new Logger(CommentsService.name);

  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  getActiveComments() {
    return this.commentsRepository.find({
      where: { status: CommentStatus.ACTIVE },
    });
  }

  getComment(id: number) {
    return `This action returns a #${id} comment`;
  }

  createComment(createCommentDto: CreateCommentDto) {
    const comment = this.commentsRepository.create({
      text: createCommentDto.text,
      userId: createCommentDto.userId,
      status: CommentStatus.INACTIVE,
    });

    this.logger.log(`Creating comment: ${JSON.stringify(comment)}`);

    return this.commentsRepository.save(comment);
  }

  updateCommentStatus(id: number, status: CommentStatus) {
    this.logger.log(`Updating comment status: #${id} to ${status}`);

    return this.commentsRepository.update(id, { status });
  }

  removeComment(id: number) {
    return `This action removes a #${id} comment`;
  }
}
