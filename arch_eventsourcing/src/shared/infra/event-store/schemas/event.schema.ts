import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: false,
  },
})
export class Event {
  @Prop()
  streamId: string; // aggregateId

  @Prop()
  type: string;

  @Prop()
  position: number;

  @Prop({
    type: SchemaTypes.Mixed,
  })
  data: Record<string, any>;
}

export const EventSchema = SchemaFactory.createForClass(Event);
EventSchema.index({ streamId: 1, position: 1 }, { unique: true }); // no 2 events with same position in same stream
