import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAccountQuery } from './get-account.query';
import { TransactionRepository } from '../ports/transaction.repository';
import { Logger } from '@nestjs/common';

@QueryHandler(GetAccountQuery)
export class GetAccountQueryHandler implements IQueryHandler<GetAccountQuery> {
  private readonly logger = new Logger(GetAccountQueryHandler.name);

  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(query: GetAccountQuery): Promise<any> {
    this.logger.debug(
      `GetAccountQueryHandler.execute: ${JSON.stringify(query)}`,
    );

    const transactions = await this.transactionRepository.findByAccountNumber(
      query.accountNumber,
    );

    return {
      accountNumber: query.accountNumber,
      balance: transactions.reduce((acc, curr) => {
        if (curr.type === 'deposit') {
          return acc + curr.amount;
        }

        return acc - curr.amount;
      }, 0),
    };
  }
}
