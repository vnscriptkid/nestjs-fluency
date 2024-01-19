import { Transaction } from 'src/transactions/domains/transaction';

export class TransactionCreatedEvent {
  constructor(public readonly transaction: Transaction) {}
}
