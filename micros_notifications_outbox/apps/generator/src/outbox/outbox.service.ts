import { Injectable, Logger } from '@nestjs/common';
import { Outbox } from './entities/outbox.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OutboxService {
  private readonly logger = new Logger(OutboxService.name);

  constructor(
    @InjectRepository(Outbox)
    private readonly outboxRepository: Repository<Outbox>,
  ) {}

  getUnprocessed(type: string, target: string): Promise<Outbox[]> {
    return this.outboxRepository.find({
      where: { isProcessed: false, type, target },
      take: 2,
      order: { createdAt: 'ASC' },
    });
  }

  markAsProcessed(id: number) {
    return this.outboxRepository.update(id, { isProcessed: true });
  }
}
