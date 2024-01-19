import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../presenter/dto/create-transaction.dto';
import { UpdateTransactionDto } from '../presenter/dto/update-transaction.dto';
import { TransactionRepository } from './ports/transaction.repository';
import { TransactionType } from '../domains/transaction';

@Injectable()
export class TransactionsService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  create(createTransactionDto: CreateTransactionDto) {
    return this.transactionRepository.save({
      accountNumber: createTransactionDto.accountNumber,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type as TransactionType,
    });
  }

  findAll() {
    return this.transactionRepository.findByAccountNumber('1');
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
