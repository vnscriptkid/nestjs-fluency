import { OrderStatus } from './value-object/order-status';

export class Order {
  constructor(
    readonly id: string,
    readonly customerId: string,
    readonly status: OrderStatus,
  ) {}
}
