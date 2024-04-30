import { NestFactory } from '@nestjs/core';
import { NotificationSvcModule } from './notification-svc.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(NotificationSvcModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: 'notification_queue',
    },
  });

  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
