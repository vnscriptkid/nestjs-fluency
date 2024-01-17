import { Module } from '@nestjs/common';
import { OrderRepository } from 'src/order/application/port/order.repository';
import { PrismaOrderRepository } from './repository/order.repository';
import { PrismaService } from './prisma.service';

@Module({
  providers: [
    {
      provide: OrderRepository, // port
      useClass: PrismaOrderRepository, // adapter
    },
    PrismaService,
  ],
  exports: [OrderRepository],
})
export class PrismaOrderPersistenceModule {}
