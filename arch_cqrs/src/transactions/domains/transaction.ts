export class Transaction {
  id?: string;
  amount: number;
  type: TransactionType;
  accountNumber: string;

  constructor(
    id: string,
    amount: number,
    type: TransactionType,
    accountNumber: string,
  ) {
    this.id = id;
    this.amount = amount;
    this.type = type;
    this.accountNumber = accountNumber;
  }
}

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
}
