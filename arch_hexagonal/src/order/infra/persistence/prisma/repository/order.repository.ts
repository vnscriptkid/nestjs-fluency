import { OrderRepository } from 'src/order/application/port/order.repository';
import { Order } from 'src/order/domain/order';
import { Injectable } from '@nestjs/common';
import { OrderMapper } from '../mapper/order.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(order: Order): Promise<Order> {
    const dao = await this.prisma.order.create({
      data: OrderMapper.toPersistence(order),
    });

    return OrderMapper.toDomain(dao);
  }

  async findAll(): Promise<Order[]> {
    const daos = await this.prisma.order.findMany();

    return daos.map((dao) => OrderMapper.toDomain(dao));
  }
}
