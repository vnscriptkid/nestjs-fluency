import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './ports/transaction.repository';

@Injectable()
export class AccountService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async findOne(id: string) {
    const transactions =
      await this.transactionRepository.findByAccountNumber(id);

    return {
      accountNumber: id,
      balance: transactions.reduce((acc, curr) => {
        if (curr.type === 'deposit') {
          return acc + curr.amount;
        }

        return acc - curr.amount;
      }, 0),
    };
  }
}
