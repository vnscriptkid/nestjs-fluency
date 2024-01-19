export class CreateTransactionDto {
  amount: number;
  type: 'deposit' | 'withdrawal';
  accountNumber: string;
}
