import { Module } from '@nestjs/common';
import { OutboxService } from './outbox.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Outbox } from './entities/outbox.entity';
import { OutboxProcessor } from './outbox.processor';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE } from '../constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Outbox]),
    ClientsModule.register([
      {
        name: NOTIFICATION_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: process.env.NATS_URL,
        },
      },
    ]),
  ],
  providers: [OutboxService, OutboxProcessor],
})
export class OutboxModule {}
