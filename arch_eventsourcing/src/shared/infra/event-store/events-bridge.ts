import {
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { ChangeStream, ChangeStreamInsertDocument } from 'mongodb';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { EVENT_STORE_CONNECTION } from 'src/core/core.constants';
import { EventDeserializer } from './deserializers/event.deserializer';

export class EventsBridge
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private changeStream: ChangeStream;
  private readonly logger = new Logger(EventsBridge.name);

  constructor(
    @InjectModel(Event.name, EVENT_STORE_CONNECTION)
    private readonly eventStore: Model<Event>,
    private readonly eventBus: EventBus,
    private readonly eventDeserializer: EventDeserializer,
  ) {}

  onApplicationShutdown(signal?: string) {
    return this.changeStream.close();
  }
  onApplicationBootstrap() {
    this.logger.debug('Starting event bridge...');
    // push based approach
    this.changeStream = this.eventStore
      .watch()
      .on('change', (change: ChangeStreamInsertDocument<EventDocument>) => {
        if (change.operationType === 'insert') {
          this.handleEvent(change);
        }
      });
  }
  handleEvent(change: ChangeStreamInsertDocument<EventDocument>) {
    this.logger.debug(`Handling event: ${JSON.stringify(change)}`);
    const insertedEvent = change.fullDocument;

    const event = this.eventDeserializer.deserialize(insertedEvent);

    this.logger.debug(
      `Publishing event of type ${event.data.constructor.name}: ${JSON.stringify(event.data)}`,
    );

    // Directly pushing an event into the EventBus's internal stream
    // This bypasses any additional logic that EventBus.publish() might perform.
    // Why? EventBus.publish() has been overridden by EventStorePublisher
    this.eventBus.subject$.next(event.data);
  }
}
