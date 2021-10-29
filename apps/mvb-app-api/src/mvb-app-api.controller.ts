import { Controller, Get } from '@nestjs/common';
import { MvbAppApiService } from './mvb-app-api.service';

@Controller()
export class MvbAppApiController {
  constructor(private readonly mvbAppApiService: MvbAppApiService) {}

  @Get('/me')
  getHello(): string {
    return this.mvbAppApiService.getHello();
  }
}
