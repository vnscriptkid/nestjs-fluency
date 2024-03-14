import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoCommand } from './create-todo.command';
import { TodoFactory } from 'src/todo/domains/factories/todo.factory';

@CommandHandler(CreateTodoCommand)
export class CreateTodoCommandHandler
  implements ICommandHandler<CreateTodoCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher, // internally uses eventBus.publisher
    private readonly todoFactory: TodoFactory,
  ) {}

  async execute(command: CreateTodoCommand): Promise<any> {
    const todo = this.todoFactory.create(
      command.title,
      command.description,
      command.severity,
    );

    // enhances the entity with methods to publish events
    // events emitted by the entities are properly routed through the EventBus
    // NOTICE: This is not default nestjs event publisher
    // This is an instance of the EventStorePublisher, that overrides eventBus.publisher OnApplicationBootstrap
    this.eventPublisher.mergeObjectContext(todo);

    // provoke EventStorePublisher.publishAll given uncommitted events
    todo.commit();

    return todo;
  }
}
