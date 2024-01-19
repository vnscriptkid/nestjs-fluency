import { transactions } from '@prisma/client';
import {
  Transaction,
  TransactionType,
} from 'src/transactions/domains/transaction';

export class TransactionMapper {
  static toPersistence(transaction: Transaction): transactions {
    return {
      id: transaction.id,
      amount: transaction.amount,
      type: transaction.type,
      accountNumber: transaction.accountNumber,
    };
  }

  static toDomain(transaction: transactions): Transaction {
    return {
      id: transaction.id,
      amount: transaction.amount,
      type: transaction.type as TransactionType,
      accountNumber: transaction.accountNumber,
    };
  }
}
