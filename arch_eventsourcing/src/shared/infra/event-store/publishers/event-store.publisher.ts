import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { EventBus, IEvent, IEventPublisher } from '@nestjs/cqrs';
import { EventSerializer } from '../serializers/event.serializer';
import { VersionedAggregateRoot } from 'src/shared/domain/aggregate-root';
import { MongoEventStore } from '../mongo-event-store';

// custom event publisher
@Injectable()
export class EventStorePublisher
  implements IEventPublisher, OnApplicationBootstrap
{
  private readonly logger = new Logger(EventStorePublisher.name);

  constructor(
    private readonly eventBus: EventBus,
    private readonly eventSerializer: EventSerializer,
    private readonly eventStore: MongoEventStore,
  ) {}

  onApplicationBootstrap() {
    // overrides the default event publishing mechanism of the EventBus
    this.eventBus.publisher = this;
  }

  publish<TEvent extends IEvent>(
    event: TEvent,
    dispatcher?: VersionedAggregateRoot,
  ) {
    this.logger.log(`Publishing event: ${JSON.stringify(event)}`);

    const serializableEvent = this.eventSerializer.serialize(event, dispatcher);

    return this.eventStore.persist(serializableEvent);
  }

  publishAll?<TEvent extends IEvent>(
    events: TEvent[],
    dispatcher?: VersionedAggregateRoot,
  ) {
    this.logger.log(
      `Publishing ${events.length} events: ${JSON.stringify(events)}}`,
    );
    const serializableEvents = events
      .map((event) => this.eventSerializer.serialize(event, dispatcher))
      .map((event, idx) => ({
        ...event,
        position: dispatcher.version.value + idx + 1,
      }));

    return this.eventStore.persist(serializableEvents);
  }
}
