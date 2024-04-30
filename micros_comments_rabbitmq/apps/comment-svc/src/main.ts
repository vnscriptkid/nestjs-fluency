import { NestFactory } from '@nestjs/core';
import { CommentSvcModule } from './comment-svc.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(CommentSvcModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: 'moderation_queue',
    },
  });

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
