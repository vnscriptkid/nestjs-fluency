import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/application/order.module';
import { CoreModule } from './core/core.module';
import { AppBootstrapOpts } from './common/interface/app-bootstrap-opts.interface';
import { OrderInfraModule } from './order/infra/order-infra.module';

@Module({
  imports: [/*OrderModule,*/ CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static register(opts: AppBootstrapOpts) {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(opts),
        OrderModule.withInfrastructure(OrderInfraModule.use(opts.driver)),
      ],
    };
  }
}
