import { Injectable, Logger } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { Inbox } from './entities/inbox.entity';

@Injectable()
export class InboxService {
  private readonly logger = new Logger(InboxService.name);

  constructor(private readonly dataSource: DataSource) {}

  processPendingInboxes(
    processFn: (inbox: Inbox[], manager: EntityManager) => Promise<void>,
  ) {
    return this.dataSource.transaction(async (manager) => {
      // If any error occurs in the transaction, the transaction will be rolled back
      const inboxRepo = manager.getRepository(Inbox);

      const inboxes = await inboxRepo.find({
        where: {
          status: 'pending',
        },
        order: {
          createdAt: 'ASC',
        },
      });

      this.logger.log(`....Processing ${inboxes.length} inboxes`);

      await processFn(inboxes, manager);

      this.logger.log(`>>>>Processed ${inboxes.length} inboxes`);
    });
  }
}
