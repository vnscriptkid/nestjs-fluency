import { Module } from '@nestjs/common';
import { AppBootstrapOpts } from 'src/common/interface/app-bootstrap-opts.interface';

@Module({})
export class CoreModule {
  static forRoot(opts: AppBootstrapOpts) {
    const imports = [];

    switch (opts.driver) {
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
