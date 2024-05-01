import { Injectable, Logger } from '@nestjs/common';
import { NOTIFICATION_SERVICE } from './constants';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DataSource } from 'typeorm';
import { Todo } from './todos/entities/todo.entity';
import { Outbox } from './outbox/entities/outbox.entity';

@Injectable()
export class GeneratorService {
  private readonly logger = new Logger(GeneratorService.name);

  constructor(private readonly dataSource: DataSource) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async generateNotifications() {
    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();

    const todoRepo = queryRunner.manager.getRepository(Todo);
    const outboxRepo = queryRunner.manager.getRepository(Outbox);

    try {
      const todo = todoRepo.create({
        title: 'Hello World',
        done: false,
      });
      await todoRepo.save(todo);

      const outbox = outboxRepo.create({
        type: NOTIFICATION_SERVICE.description,
        target: 'notification.created',
        isProcessed: false,
        payload: todo,
      });

      await outboxRepo.save(outbox);
      await queryRunner.commitTransaction();
      this.logger.log(`Notification is going to be sent for todo #${todo.id}`);
    } catch (err) {
      this.logger.error('Error occurred: ', err);
      await queryRunner.rollbackTransaction();
    }

    // Move this to the outbox service
    // this.notificationSvc.emit('notification.created', data);
  }
}
