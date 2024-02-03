import { VersionedAggregateRoot } from 'src/shared/domain/aggregate-root';
import { TodoSeverity } from './value-objects/todo-severity';
import { TodoMarkedDoneEvent } from './events/todo-marked-done.event';
import {
  SerializableEvent,
  SerializedEventPayload,
} from 'src/shared/domain/interfaces/serializable-event';
import { TodoCreatedEvent } from './events/todo-created.event';

export class Todo extends VersionedAggregateRoot {
  public name: string;
  public description: string;
  public severity: TodoSeverity;
  public createdAt: Date;
  public isDone: boolean;
  public dueDate: Date;
  // TODO: add TodoItem[]

  constructor(public id: string) {
    super();
  }

  markAsDone(): void {
    // The apply will
    // (1) call corresponding event handler onTodoMarkedDoneEvent
    // (2) store the event in uncommittedEvents
    this.apply(new TodoMarkedDoneEvent(this.id));
  }

  [`on${TodoMarkedDoneEvent.name}`](
    event: SerializableEvent<TodoMarkedDoneEvent>,
  ): void {
    this.isDone = true;
  }

  [`on${TodoCreatedEvent.name}`](
    event: SerializedEventPayload<TodoCreatedEvent>,
  ): void {
    this.id = event.todo.id;
    this.name = event.todo.name;
    this.description = event.todo.description;
    this.severity = new TodoSeverity(
      event.todo.severity as TodoSeverity['value'],
    );
    this.createdAt = new Date(event.todo.createdAt);
    this.isDone = event.todo.isDone;
    this.dueDate = new Date(event.todo.dueDate);
  }

  increaseSeverity(): void {
    switch (this.severity.value) {
      case 'low':
        this.severity = new TodoSeverity('medium');
        break;
      case 'medium':
        this.severity = new TodoSeverity('high');
        break;
      default:
        break;
    }
  }
}
