import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TransactionCreatedEvent } from './transaction-created.event';
import { Logger } from '@nestjs/common';
import { AccountRepository } from '../ports/account.repository';
import { TransactionRepository } from '../ports/transaction.repository';
import { AccountFactory } from 'src/transactions/domains/factories/account.factory';

@EventsHandler(TransactionCreatedEvent)
export class TransactionCreatedEventHandler
  implements IEventHandler<TransactionCreatedEvent>
{
  private readonly logger = new Logger(TransactionCreatedEventHandler.name);

  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly accountFactory: AccountFactory,
  ) {}

  async handle(event: TransactionCreatedEvent) {
    this.logger.debug(`Event created: ${JSON.stringify(event)}`);
    // Aggregate all transactions by account number
    const transactions = await this.transactionRepository.findByAccountNumber(
      event.transaction.accountNumber,
    );

    // Calculate new balance
    const balance = transactions.reduce((cur, txn) => {
      if (txn.type === 'deposit') {
        return cur + txn.amount;
      } else if (txn.type === 'withdrawal') {
        return cur - txn.amount;
      }
      return cur;
    }, 0);

    // Upsert account with new balance
    const account = await this.accountRepository.unsert(
      this.accountFactory.create(event.transaction.accountNumber, balance),
    );

    this.logger.debug(`Account updated: ${JSON.stringify(account)}`);
  }
}
