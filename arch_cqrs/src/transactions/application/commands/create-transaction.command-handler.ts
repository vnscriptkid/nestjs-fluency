import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTransactionCommand } from './create-transaction.command';
import { TransactionRepository } from '../ports/transaction.repository';
import { Logger } from '@nestjs/common';
import { TransactionType } from 'src/transactions/domains/transaction';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionCommandHandler
  implements ICommandHandler<CreateTransactionCommand>
{
  private readonly logger = new Logger(CreateTransactionCommandHandler.name);

  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(command: CreateTransactionCommand): Promise<any> {
    this.logger.debug(
      `CreateTransactionCommandHandler.execute: ${JSON.stringify(command)}`,
    );

    return this.transactionRepository.save({
      accountNumber: command.accountNumber,
      amount: command.amount,
      type: command.type as TransactionType,
    });
  }
}
