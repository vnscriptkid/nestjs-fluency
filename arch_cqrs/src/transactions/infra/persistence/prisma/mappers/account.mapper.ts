import { accounts } from '@prisma/client';
import { Account } from 'src/transactions/domains/account';

export class AccountMapper {
  static toDomain(account: accounts) {
    const accountDomain = new Account();
    accountDomain.accountNumber = account.accountNumber;
    accountDomain.balance = account.balance;
    return accountDomain;
  }
  static toPersistence(accountDomain: Account): accounts {
    return {
      accountNumber: accountDomain.accountNumber,
      balance: accountDomain.balance,
    };
  }
}
