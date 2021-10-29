import { Injectable } from '@nestjs/common';

@Injectable()
export class MvbAppApiService {
  getHello(): string {
    return 'Hello World!';
  }
}
