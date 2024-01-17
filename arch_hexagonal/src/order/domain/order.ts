import { OrderStatus } from './value-object/order-status';

export class Order {
  constructor(
    readonly id: number,
    readonly customerId: string,
    readonly status: OrderStatus,
  ) {}
}
