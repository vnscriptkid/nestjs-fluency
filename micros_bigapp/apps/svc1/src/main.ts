import { NestFactory } from '@nestjs/core';
import { Svc1Module } from './svc1.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Create hybrid app that supports both http and nats
  const app = await NestFactory.create(Svc1Module);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: process.env.NATS_URL,
      // This means all instances of this service will belong to the same consumer group
      // So 1 request will be processed by only 1 instance of this group
      queue: 'workflows-service',
    },
  });

  await app.startAllMicroservices();

  await app.listen(3001);
}
bootstrap();
