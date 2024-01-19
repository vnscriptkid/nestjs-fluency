import { Injectable } from '@nestjs/common';
import { CreateTransactionCommand } from './commands/create-transaction.command';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class TransactionsService {
  constructor(private readonly commandBus: CommandBus) {}

  create(createTransactionCommand: CreateTransactionCommand) {
    return this.commandBus.execute(createTransactionCommand);
  }
}
