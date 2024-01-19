import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TransactionRepository } from 'src/transactions/application/ports/transaction.repository';
import { Transaction } from 'src/transactions/domains/transaction';
import { TransactionMapper } from '../mappers/transaction.mapper';

@Injectable()
export class PrismaTransactionRepository extends TransactionRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async save(transaction: Transaction): Promise<Transaction> {
    const txn = await this.prisma.transactions.create({
      data: TransactionMapper.toPersistence(transaction),
    });

    return TransactionMapper.toDomain(txn);
  }

  async findByAccountNumber(accountNumber: string): Promise<Transaction[]> {
    const txns = await this.prisma.transactions.findMany({
      where: {
        accountNumber,
      },
    });

    return txns.map((txn) => TransactionMapper.toDomain(txn));
  }
}
