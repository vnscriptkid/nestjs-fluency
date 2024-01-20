import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateTodoCommand } from './commands/create-todo.command';

@Injectable()
export class TodoService {
  constructor(private readonly commandBus: CommandBus) {}

  async createTodo(createTodoDto: CreateTodoCommand) {
    return this.commandBus.execute(createTodoDto);
  }
}
