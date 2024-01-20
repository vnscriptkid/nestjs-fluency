import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/applications/todo.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CqrsModule.forRoot(), CoreModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
