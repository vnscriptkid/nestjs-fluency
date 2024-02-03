import { AggregateRoot } from '@nestjs/cqrs';
import { Version } from './value-objects/version';
import { SerializableEvent } from './interfaces/serializable-event';

const VERSION = Symbol('version');

export class VersionedAggregateRoot extends AggregateRoot {
  public id: string;

  private [VERSION] = new Version(0);

  get version(): Version {
    return this[VERSION];
  }

  loadFromHistory(history: SerializableEvent[]): void {
    const domainEvents = history.map((event) => event.data);

    // iterate over the events and apply them to the aggregate
    // apply invokes the event handler based on the event type. E.g: TodoCreatedEvent -> onTodoCreatedEvent
    // in this context, apply does not store the event in uncommittedEvents
    super.loadFromHistory(domainEvents);

    const lastEvent = history[history.length - 1];
    this.setVersion(new Version(lastEvent.position));
  }

  private setVersion(version: Version): void {
    this[VERSION] = version;
  }
}
