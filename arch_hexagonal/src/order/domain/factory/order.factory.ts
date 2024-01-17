import { Injectable } from '@nestjs/common';
import { Order } from '../order';
import { OrderStatus } from '../value-object/order-status';

@Injectable()
export class OrderFactory {
  create(id: number, customerId: string, status: string) {
    const orderStatus = new OrderStatus(status as OrderStatus['value']);

    return new Order(id, customerId, orderStatus);
  }
}
