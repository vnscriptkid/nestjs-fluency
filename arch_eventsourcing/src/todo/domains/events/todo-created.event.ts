import { Todo } from '../todo';

export class TodoCreatedEvent {
  constructor(public todo: Todo) {}
}
