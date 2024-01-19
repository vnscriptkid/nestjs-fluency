import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TransactionCreatedEvent } from './transaction-created.event';
import { Logger } from '@nestjs/common';

@EventsHandler(TransactionCreatedEvent)
export class TransactionCreatedEventHandler
  implements IEventHandler<TransactionCreatedEvent>
{
  private readonly logger = new Logger(TransactionCreatedEventHandler.name);

  handle(event: TransactionCreatedEvent) {
    this.logger.debug(`Event created: ${JSON.stringify(event)}`);
  }
}
