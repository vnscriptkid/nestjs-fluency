import { DynamicModule, Module, Type } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from '../presenter/transactions.controller';
import { TransactionFactory } from '../domains/factories/transaction.factory';
import { AccountService } from './account.service';
import { AccountController } from '../presenter/account.controller';

@Module({
  controllers: [TransactionsController, AccountController],
  providers: [TransactionsService, TransactionFactory, AccountService],
})
export class TransactionsModule {
  // allows consumer of TransactionModule to pass in the infrastructure that it wants to use
  // decouples the infrastructure from the application
  static withInfrastructure(infrastructureModule: Type | DynamicModule) {
    return {
      module: TransactionsModule,
      imports: [infrastructureModule],
    };
  }
}
