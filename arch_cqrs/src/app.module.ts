import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CqrsModule } from '@nestjs/cqrs';
import { TransactionsModule } from './transactions/application/transactions.module';
import { PrismaService } from './prisma.service';
import { AppBootstrapOpts } from './common/interface/app-bootstrap-opts.interface';
import { CoreModule } from './core/core.module';
import { TransactionInfraModule } from './transactions/infra/transaction-infra.module';

@Module({
  imports: [CqrsModule.forRoot() /*, TransactionsModule*/],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {
  static register(opts: AppBootstrapOpts) {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(opts),
        TransactionsModule.withInfrastructure(
          TransactionInfraModule.use(opts.driver),
        ),
      ],
    };
  }
}
