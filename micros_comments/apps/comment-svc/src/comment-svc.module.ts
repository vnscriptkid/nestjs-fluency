import { Module } from '@nestjs/common';
import { CommentSvcController } from './comment-svc.controller';
import { CommentSvcService } from './comment-svc.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CommentsModule,
  ],
  controllers: [CommentSvcController],
  providers: [CommentSvcService],
})
export class CommentSvcModule {}
