import { Account } from '../account';

export class AccountFactory {
  create(accountNumber: string, balance: number) {
    const account = new Account();
    account.accountNumber = accountNumber;
    account.balance = balance;
    return account;
  }
}
