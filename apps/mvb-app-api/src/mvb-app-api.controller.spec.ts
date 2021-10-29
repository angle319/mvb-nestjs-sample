import { Test, TestingModule } from '@nestjs/testing';
import { MvbAppApiController } from './mvb-app-api.controller';
import { MvbAppApiService } from './mvb-app-api.service';

describe('MvbAppApiController', () => {
  let mvbAppApiController: MvbAppApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MvbAppApiController],
      providers: [MvbAppApiService],
    }).compile();

    mvbAppApiController = app.get<MvbAppApiController>(MvbAppApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(mvbAppApiController.getHello()).toBe('Hello World!');
    });
  });
});
