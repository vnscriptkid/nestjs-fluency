import { Repository } from 'typeorm';
import { OrderEntity } from '../entity/order.entity';
import { OrderRepository } from 'src/order/application/port/order.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/order/domain/order';
import { Injectable } from '@nestjs/common';
import { OrderMapper } from '../mapper/order.mapper';

@Injectable()
export class OrmOrderRepository implements OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async save(order: Order): Promise<Order> {
    const dao = await this.orderRepository.save(
      OrderMapper.toPersistence(order),
    );

    return OrderMapper.toDomain(dao);
  }

  async findAll(): Promise<Order[]> {
    const daos = await this.orderRepository.find();

    return daos.map((dao) => OrderMapper.toDomain(dao));
  }
}
