import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateTransactionCommand } from './create-transaction.command';
import { TransactionRepository } from '../ports/transaction.repository';
import { Logger } from '@nestjs/common';
import { TransactionType } from 'src/transactions/domains/transaction';
import { TransactionCreatedEvent } from '../events/transaction-created.event';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionCommandHandler
  implements ICommandHandler<CreateTransactionCommand>
{
  private readonly logger = new Logger(CreateTransactionCommandHandler.name);

  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateTransactionCommand): Promise<any> {
    this.logger.debug(`Creating transaction: ${JSON.stringify(command)}`);

    const txn = await this.transactionRepository.save({
      accountNumber: command.accountNumber,
      amount: command.amount,
      type: command.type as TransactionType,
    });

    // This is not the best way to do this
    // Domain events should be dispatched from the aggregate root, inside the domain layer
    // this.eventBus.publish(new TransactionCreatedEvent(txn));
    this.eventBus.subject$.next(new TransactionCreatedEvent(txn));

    return txn;
  }
}
