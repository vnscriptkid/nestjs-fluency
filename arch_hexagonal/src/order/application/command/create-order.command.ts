export class CreateOrderCommand {
  constructor(
    readonly orderId: number,
    readonly customerId: string,
    readonly status: string,
  ) {}
}
