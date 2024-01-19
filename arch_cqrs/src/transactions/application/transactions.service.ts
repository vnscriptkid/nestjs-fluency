import { Injectable } from '@nestjs/common';
import { CreateTransactionCommand } from './commands/create-transaction.command';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class TransactionsService {
  constructor(private readonly commandBus: CommandBus) {}

  create(createTransactionCommand: CreateTransactionCommand) {
    return this.commandBus.execute(createTransactionCommand);
  }

  // findAll() {
  //   return this.transactionRepository.findByAccountNumber('1');
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} transaction`;
  // }

  // update(id: number, updateTransactionDto: UpdateTransactionDto) {
  //   return `This action updates a #${id} transaction`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} transaction`;
  // }
}
