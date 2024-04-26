import { Injectable } from '@nestjs/common';

@Injectable()
export class Svc1Service {
  getHello(): string {
    return 'Hello World!';
  }
}
