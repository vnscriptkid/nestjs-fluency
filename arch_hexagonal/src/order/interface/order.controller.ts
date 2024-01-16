import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from '../application/order.service';
import { CreateOrderCommand } from '../application/command/create-order.command';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(
      new CreateOrderCommand(
        createOrderDto.orderId,
        createOrderDto.customerId,
        createOrderDto.status,
      ),
    );
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }
}
