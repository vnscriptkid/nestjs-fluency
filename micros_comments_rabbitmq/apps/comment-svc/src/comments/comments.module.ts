import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MODERATION_SVC, NOTIFICATION_SVC } from '../constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    ClientsModule.register([
      {
        name: MODERATION_SVC,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'moderation_queue',
        },
      },
      {
        name: NOTIFICATION_SVC,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'notification_queue',
        },
      },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
