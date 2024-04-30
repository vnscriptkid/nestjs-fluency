import { Injectable } from '@nestjs/common';

@Injectable()
export class ModerationSvcService {
  getHello(): string {
    return 'Hello World!';
  }
}
