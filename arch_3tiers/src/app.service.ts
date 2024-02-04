import { Inject, Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';

interface IAppRepo {
  getHello(): Promise<string>;
}

@Injectable()
export class AppService {
  constructor(
    private readonly appRepo: AppRepository,
    private readonly appRepo2: AppRepository,
    @Inject(AppRepository) private readonly appRepo3: IAppRepo,
  ) {
    console.log('appRepo === appRepo2: ', appRepo === appRepo2);
    console.log('appRepo === appRepo3: ', appRepo === appRepo3);
  }

  getHello() {
    return this.appRepo.getHello();
  }
}
