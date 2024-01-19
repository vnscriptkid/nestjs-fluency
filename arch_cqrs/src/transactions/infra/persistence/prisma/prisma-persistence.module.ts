import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TransactionRepository } from 'src/transactions/application/ports/transaction.repository';
import { PrismaTransactionRepository } from './repositories/transaction.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: TransactionRepository,
      useClass: PrismaTransactionRepository,
    },
  ],
  exports: [TransactionRepository],
})
export class PrismaPersistenceModule {}
