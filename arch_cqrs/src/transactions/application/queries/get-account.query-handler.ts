import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAccountQuery } from './get-account.query';
import { Logger } from '@nestjs/common';
import { AccountRepository } from '../ports/account.repository';

@QueryHandler(GetAccountQuery)
export class GetAccountQueryHandler implements IQueryHandler<GetAccountQuery> {
  private readonly logger = new Logger(GetAccountQueryHandler.name);

  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(query: GetAccountQuery): Promise<any> {
    this.logger.debug(
      `GetAccountQueryHandler.execute: ${JSON.stringify(query)}`,
    );

    return this.accountRepository.findByAccountNumber(query.accountNumber);
  }
}
