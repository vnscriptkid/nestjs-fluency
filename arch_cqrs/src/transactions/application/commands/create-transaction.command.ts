export class CreateTransactionCommand {
  constructor(
    public readonly amount: number,
    public readonly type: 'deposit' | 'withdrawal',
    public readonly accountNumber: string,
  ) {}
}
