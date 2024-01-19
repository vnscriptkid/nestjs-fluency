import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TransactionRepository } from 'src/transactions/application/ports/transaction.repository';
import { PrismaTransactionRepository } from './repositories/transaction.repository';
import { AccountRepository } from 'src/transactions/application/ports/account.repository';
import { PrismaAccountRepository } from './repositories/account.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: TransactionRepository,
      useClass: PrismaTransactionRepository,
    },
    {
      provide: AccountRepository,
      useClass: PrismaAccountRepository,
    },
  ],
  exports: [TransactionRepository, AccountRepository],
})
export class PrismaPersistenceModule {}
