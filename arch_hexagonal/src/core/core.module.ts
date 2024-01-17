import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppBootstrapOpts } from 'src/common/interface/app-bootstrap-opts.interface';

@Module({})
export class CoreModule {
  static forRoot(opts: AppBootstrapOpts) {
    const imports = [];

    switch (opts.driver) {
      case 'orm':
        imports.push(
          TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5436,
            username: 'postgres',
            password: 'pass123',
            autoLoadEntities: true,
            synchronize: true,
          }),
        );
        break;
      case 'in-memory':
        throw new Error('Not implemented yet');
      case 'prisma':
        break;
      default:
        throw new Error('Invalid driver');
    }

    return {
      module: CoreModule,
      imports,
    };
  }
}
