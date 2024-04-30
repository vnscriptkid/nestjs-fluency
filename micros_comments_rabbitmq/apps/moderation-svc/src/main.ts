import { NestFactory } from '@nestjs/core';
import { ModerationSvcModule } from './moderation-svc.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ModerationSvcModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: 'moderation_queue',
    },
  });

  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
