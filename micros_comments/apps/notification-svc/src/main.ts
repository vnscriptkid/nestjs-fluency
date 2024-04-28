import { NestFactory } from '@nestjs/core';
import { NotificationSvcModule } from './notification-svc.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(NotificationSvcModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: process.env.NATS_URL,
      queue: 'notification-svc',
    },
  });

  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
