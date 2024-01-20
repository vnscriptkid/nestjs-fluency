import { Body, Controller, Post } from '@nestjs/common';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { TodoService } from '../applications/todo.service';
import { CreateTodoCommand } from '../applications/commands/create-todo.command';
import { TodoSeverity } from '../domains/value-objects/todo-severity';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodo(@Body() body: CreateTodoDto) {
    return this.todoService.createTodo(
      new CreateTodoCommand(
        body.title,
        body.description,
        body.severity as TodoSeverity['value'],
      ),
    );
  }
}
