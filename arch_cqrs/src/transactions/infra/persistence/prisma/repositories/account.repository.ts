import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AccountRepository } from 'src/transactions/application/ports/account.repository';
import { Account } from 'src/transactions/domains/account';
import { AccountMapper } from '../mappers/account.mapper';

@Injectable()
export class PrismaAccountRepository extends AccountRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }
  async findByAccountNumber(accountNumber: string): Promise<Account | null> {
    const account = await this.prisma.accounts.findUnique({
      where: {
        accountNumber,
      },
    });

    if (!account) {
      return null;
    }

    return AccountMapper.toDomain(account);
  }

  async unsert(account: Account): Promise<Account> {
    const acc = await this.prisma.accounts.upsert({
      create: AccountMapper.toPersistence(account),
      update: AccountMapper.toPersistence(account),
      where: {
        accountNumber: account.accountNumber,
      },
    });

    return AccountMapper.toDomain(acc);
  }
}
