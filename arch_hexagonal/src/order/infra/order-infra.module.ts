import { Module } from '@nestjs/common';
import { OrmOrderPersistenceModule } from './persistence/orm/orm-persistence.module';
import { PrismaOrderPersistenceModule } from './persistence/prisma/prisma-persistence.module';

@Module({})
export class OrderInfraModule {
  static use(driver: 'orm' | 'in-memory' | 'prisma') {
    // TODO: switch base on driver
    let persistenceModule: any = null;

    switch (driver) {
      case 'orm':
        persistenceModule = OrmOrderPersistenceModule;
        break;
      case 'in-memory':
        break;
      case 'prisma':
        persistenceModule = PrismaOrderPersistenceModule;
        break;
      default:
        break;
    }

    return {
      module: OrderInfraModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
