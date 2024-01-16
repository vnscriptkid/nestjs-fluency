import { DynamicModule, Module, Type } from '@nestjs/common';
import { OrderController } from '../interface/order.controller';
import { OrderService } from './order.service';
import { OrderFactory } from '../domain/factory/order.factory';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderFactory],
})
export class OrderModule {
  // allows consumer of OrderModule to pass in the infrastructure that it wants to use
  // decouples the infrastructure from the application
  static withInfrastructure(infrastructureModule: Type | DynamicModule) {
    return {
      module: OrderModule,
      imports: [infrastructureModule],
    };
  }
}
