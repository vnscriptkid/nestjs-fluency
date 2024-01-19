import { Module } from '@nestjs/common';
import { PrismaPersistenceModule } from './persistence/prisma/prisma-persistence.module';

@Module({})
export class TransactionInfraModule {
  static use(driver: 'in-memory' | 'prisma') {
    // TODO: switch base on driver
    let persistenceModule: any = null;

    switch (driver) {
      case 'in-memory':
        throw new Error('Not implemented');
      case 'prisma':
        persistenceModule = PrismaPersistenceModule;
        break;
      default:
        throw new Error('Invalid driver');
    }

    return {
      module: TransactionInfraModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
