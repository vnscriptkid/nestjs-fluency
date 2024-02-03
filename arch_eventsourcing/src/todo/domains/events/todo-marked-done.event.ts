import { AutowiredEvent } from 'src/shared/decorators/autowired-event.decorator';

@AutowiredEvent
export class TodoMarkedDoneEvent {
  constructor(public id: string) {}
}
