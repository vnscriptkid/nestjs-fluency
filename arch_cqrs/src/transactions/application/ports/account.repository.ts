import { Account } from 'src/transactions/domains/account';

export abstract class AccountRepository {
  abstract findByAccountNumber(accountNumber: string): Promise<Account | null>;
  abstract unsert(account: Account): Promise<Account>;
}
