import { Injectable } from '@nestjs/common';

@Injectable()
export class AppRepository {
  getHello(): Promise<string> {
    return Promise.resolve('Hello World!');
  }
}
