import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { AppRepository } from './app.repository';

@Module({
  imports: [PostModule],
  controllers: [AppController],
  providers: [AppRepository, AppService], // Order doesn't matter
})
export class AppModule {}
