import { randomUUID } from 'crypto';
import { Todo } from '../todo';
import { TodoSeverity } from '../value-objects/todo-severity';
import { TodoCreatedEvent } from '../events/todo-created.event';

export class TodoFactory {
  create(title: string, description: string, severity: string): Todo {
    const todo = new Todo(randomUUID());
    todo.name = title;
    todo.description = description;
    todo.severity = new TodoSeverity(severity as TodoSeverity['value']);
    // default values
    todo.createdAt = new Date();
    todo.isDone = false;

    // apply event: append this event to aggregate's uncommitted events queue
    todo.apply(new TodoCreatedEvent(todo), {
      skipHandler: true,
      // do not call onTodoCreated
      // because the aggregate has just been created above
    });

    return todo;
  }
}
