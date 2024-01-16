import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppBootstrapOpts } from 'src/common/interface/app-bootstrap-opts.interface';

@Module({})
export class CoreModule {
  static forRoot(opts: AppBootstrapOpts) {
    const imports = [];

    if (opts.driver === 'orm') {
      imports.push(
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'pass123',
          autoLoadEntities: true,
          synchronize: true,
        }),
      );
    } else if (opts.driver === 'in-memory') {
      throw new Error('Not implemented yet');
    }

    return {
      module: CoreModule,
      imports,
    };
  }
}
