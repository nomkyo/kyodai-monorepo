import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return { msg: 'Hello World!' };
  }

  getHelloName(name: string): string {
    return `Hello ${name}!`;
  }
}
