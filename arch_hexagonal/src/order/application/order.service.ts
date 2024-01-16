import { Injectable } from '@nestjs/common';
import { CreateOrderCommand } from './command/create-order.command';
import { OrderFactory } from '../domain/factory/order.factory';
import { OrderRepository } from './port/order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderFactory: OrderFactory,
    private readonly orderRepository: OrderRepository,
  ) {}

  create(CreateOrderCommand: CreateOrderCommand) {
    const order = this.orderFactory.create(
      CreateOrderCommand.orderId,
      CreateOrderCommand.customerId,
      CreateOrderCommand.status,
    );

    return this.orderRepository.save(order);
  }

  findAll() {
    return this.orderRepository.findAll();
  }
}
