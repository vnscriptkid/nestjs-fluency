import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoCommand } from './create-todo.command';
import { TodoFactory } from 'src/todo/domains/factories/todo.factory';

@CommandHandler(CreateTodoCommand)
export class CreateTodoCommandHandler
  implements ICommandHandler<CreateTodoCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly todoFactory: TodoFactory,
  ) {}

  async execute(command: CreateTodoCommand): Promise<any> {
    const todo = this.todoFactory.create(
      command.title,
      command.description,
      command.severity,
    );

    // bind publishAll method to todo aggregate
    this.eventPublisher.mergeObjectContext(todo);

    // provoke publishAll given uncommitted events
    todo.commit();

    return todo;
  }
}
