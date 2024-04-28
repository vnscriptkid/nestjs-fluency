import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentSvcService {
  getHello(): string {
    return 'Hello World!';
  }
}
