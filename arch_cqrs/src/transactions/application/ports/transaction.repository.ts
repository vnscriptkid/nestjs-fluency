import { Transaction } from 'src/transactions/domains/transaction';

export abstract class TransactionRepository {
  abstract save(transaction: Transaction): Promise<Transaction>;
  abstract findByAccountNumber(accountNumber: string): Promise<Transaction[]>;
}
