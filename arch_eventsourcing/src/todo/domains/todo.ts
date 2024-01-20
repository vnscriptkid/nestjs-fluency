import { VersionedAggregateRoot } from 'src/shared/domain/aggregate-root';
import { TodoSeverity } from './value-objects/todo-severity';

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
    this.isDone = true;
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
