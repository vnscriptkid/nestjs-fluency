import { Module } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inbox } from './entities/inbox.entity';
import { InboxProcessor } from './inbox.processor';
import { InboxController } from './inbox.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Inbox])],
  providers: [InboxService, InboxProcessor],
  controllers: [InboxController],
})
export class InboxModule {}
