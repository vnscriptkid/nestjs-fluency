import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entity/order.entity';
import { OrderRepository } from 'src/order/application/port/order.repository';
import { OrmOrderRepository } from './repository/order.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  providers: [
    {
      provide: OrderRepository, // port
      useClass: OrmOrderRepository, // adapter
    },
  ],
  exports: [OrderRepository],
})
export class OrmOrderPersistenceModule {}
