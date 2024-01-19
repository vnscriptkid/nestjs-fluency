import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAccountQuery } from './queries/get-account.query';

@Injectable()
export class AccountService {
  constructor(private readonly queryBus: QueryBus) {}

  async findOne(id: string) {
    return this.queryBus.execute(new GetAccountQuery(id));
  }
}
