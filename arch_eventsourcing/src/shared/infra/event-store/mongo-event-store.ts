import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { Event } from './schemas/event.schema';
import { InjectModel } from '@nestjs/mongoose';
import { EVENT_STORE_CONNECTION } from 'src/core/core.constants';
import { SerializableEvent } from 'src/shared/domain/interfaces/serializable-event';
import { EventDeserializer } from './deserializers/event.deserializer';
import { EventStore } from 'src/shared/applications/ports/event-store';

@Injectable()
export class MongoEventStore implements EventStore {
  private readonly logger = new Logger(MongoEventStore.name);

  constructor(
    @InjectModel(Event.name, EVENT_STORE_CONNECTION)
    private readonly eventStore: Model<Event>,
    private eventDeserializer: EventDeserializer,
  ) {}

  async persist(
    eventOrEvents: SerializableEvent | SerializableEvent[],
  ): Promise<void> {
    const events = Array.isArray(eventOrEvents)
      ? eventOrEvents
      : [eventOrEvents];

    const session = await this.eventStore.startSession();

    try {
      session.startTransaction();
      await this.eventStore.insertMany(events, { session, ordered: true });
      await session.commitTransaction();
      this.logger.log(
        `Persisted ${events.length} events: ${JSON.stringify(events)}`,
      );
    } catch (error) {
      await session.abortTransaction();

      const UNIQUE_CONSTRAINT_ERROR_CODE = 11000;
      if (error?.code === UNIQUE_CONSTRAINT_ERROR_CODE) {
        this.logger.error('Event already exists in the store');
        console.error(error?.writeErrors?.[0]?.err?.errmsg);
      } else {
        throw error;
      }
    } finally {
      await session.endSession();
    }
  }

  async getEventsByStreamId(streamId: string): Promise<SerializableEvent[]> {
    const events = await this.eventStore
      .find({ streamId })
      .sort({ version: 1 });

    if (events.length === 0) {
      throw new Error(`No events found for streamId: ${streamId}`);
    }

    return events.map((event) =>
      this.eventDeserializer.deserialize(event.toJSON()),
    );
  }
}
