import { EventPublisher } from '@nestjs/cqrs';
import { EventStore } from './ports/event-store';
import { VersionedAggregateRoot } from '../domain/aggregate-root';
import { Injectable, Type } from '@nestjs/common';

@Injectable()
export class AggregateRehydrator {
  constructor(
    private readonly eventStore: EventStore,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async rehydrate<T extends VersionedAggregateRoot>(
    aggregateId: string,
    AggregateRootCls: Type<T>,
  ): Promise<T> {
    const events = await this.eventStore.getEventsByStreamId(aggregateId);

    // merge the aggregate root class with the event publisher
    // so that we can publish events from instance of this class
    // this publisher is actually an instance of EventStorePublisher
    const AggregateClsWithDispatcher =
      this.eventPublisher.mergeClassContext(AggregateRootCls);
    const aggregateRoot = new AggregateClsWithDispatcher(aggregateId);

    // replay the events to build the current state of the aggregate root
    aggregateRoot.loadFromHistory(events);

    return aggregateRoot;
  }
}
