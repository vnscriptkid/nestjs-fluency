import { Injectable } from '@nestjs/common';
import { Transaction, TransactionType } from '../transaction';
import { randomUUID } from 'crypto';

@Injectable()
export class TransactionFactory {
  create(type: string, amount: number, accountNumber: string) {
    if (!['deposit', 'withdrawal'].includes(type)) {
      throw new Error('Invalid transaction type');
    }

    return new Transaction(
      randomUUID(),
      amount,
      type as TransactionType,
      accountNumber,
    );
  }
}
