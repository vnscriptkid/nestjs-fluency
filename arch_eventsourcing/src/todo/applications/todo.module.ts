import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { TodoController } from '../presenters/todo.controller';
import { TodoService } from './todo.service';
import { CreateTodoCommandHandler } from './commands/create-todo.command-handler';
import { TodoFactory } from '../domains/factories/todo.factory';
import { TodoCreatedEventHandler } from './events/todo-created.event-handler';
import { MarkTodoDoneCommandHandler } from './commands/mark-todo-done.command-handler';

@Module({
  imports: [SharedModule],
  exports: [SharedModule],
  controllers: [TodoController],
  providers: [
    TodoService,
    CreateTodoCommandHandler,
    TodoCreatedEventHandler,
    MarkTodoDoneCommandHandler,
    TodoFactory,
  ],
})
export class TodoModule {}
