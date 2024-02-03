import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SerializedEventPayload } from 'src/shared/domain/interfaces/serializable-event';
import { Todo } from 'src/todo/domains/todo';
import { Logger } from '@nestjs/common';
import { TodoCreatedEvent } from 'src/todo/domains/events/todo-created.event';
import { TodoSeverity } from 'src/todo/domains/value-objects/todo-severity';

@EventsHandler(TodoCreatedEvent)
export class TodoCreatedEventHandler
  implements IEventHandler<SerializedEventPayload<TodoCreatedEvent>>
{
  private readonly logger = new Logger(TodoCreatedEventHandler.name);

  constructor() {}

  handle(event: SerializedEventPayload<TodoCreatedEvent>) {
    const todo = new Todo(event.todo.id);
    todo.name = event.todo.name;
    todo.description = event.todo.description;
    todo.severity = new TodoSeverity(
      event.todo.severity as TodoSeverity['value'],
    );
    todo.createdAt = new Date(event.todo.createdAt);
    todo.isDone = event.todo.isDone;
    todo.dueDate = new Date(event.todo.dueDate);

    this.logger.debug(`Todo created: ${JSON.stringify(todo)}`);
  }
}
