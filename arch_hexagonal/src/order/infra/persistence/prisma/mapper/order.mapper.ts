import { OrderStatus } from 'src/order/domain/value-object/order-status';
import { order as OrderEntity } from '@prisma/client';
import { Order } from 'src/order/domain/order';

export class OrderMapper {
  static toDomain(dao: OrderEntity): Order {
    const status = new OrderStatus(dao.status as OrderStatus['value']);

    return new Order(dao.id, dao.customerId, status);
  }

  static toPersistence(order: Order): OrderEntity {
    return {
      id: order.id,
      customerId: order.customerId,
      status: order.status.value,
    };
  }
}
