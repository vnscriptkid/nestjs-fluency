import { AutowiredEvent } from 'src/shared/decorators/autowired-event.decorator';
import { Todo } from '../todo';

@AutowiredEvent
export class TodoCreatedEvent {
  constructor(public todo: Todo) {}
}
