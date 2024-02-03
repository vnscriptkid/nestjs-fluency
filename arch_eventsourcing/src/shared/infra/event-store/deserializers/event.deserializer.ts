import { SerializableEvent } from 'src/shared/domain/interfaces/serializable-event';
import { Event } from '../schemas/event.schema';
import { TodoCreatedEvent } from 'src/todo/domains/events/todo-created.event';
import { Injectable, Type } from '@nestjs/common';
import { EventClsRegistry } from '../event-cls.registry';

@Injectable()
export class EventDeserializer {
  deserialize<T>(event: Event): SerializableEvent<T> {
    const eventCls = this.getEventClassByType(event.type);

    return {
      ...event,
      data: this.instantiateSerializedEvent(eventCls, event.data),
    };
  }
  instantiateSerializedEvent<T extends Type>(
    eventCls: T,
    data: Record<string, any>,
  ) {
    return Object.assign(Object.create(eventCls.prototype), data);
  }

  getEventClassByType(type: string) {
    // Naive impl
    // This requires a manual mapping of event types to classes
    // Pros: It's simple, centralized
    // switch (type) {
    //   case TodoCreatedEvent.name:
    //     return TodoCreatedEvent;
    // }

    // Advanced impl
    // Remember to annotate event classes with @AutowiredEvent
    return EventClsRegistry.get(type);
  }
}
