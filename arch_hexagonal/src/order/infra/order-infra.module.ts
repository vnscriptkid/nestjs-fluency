import { Module } from '@nestjs/common';
import { OrmOrderPersistenceModule } from './persistence/orm/orm-persistence.module';

@Module({})
export class OrderInfraModule {
  static use(driver: 'orm' | 'in-memory') {
    // TODO: switch base on driver
    const persistenceModule = OrmOrderPersistenceModule;

    return {
      module: OrderInfraModule,
      providers: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
