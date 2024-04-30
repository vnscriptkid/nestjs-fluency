import { Test, TestingModule } from '@nestjs/testing';
import { ModerationSvcController } from './moderation-svc.controller';
import { ModerationSvcService } from './moderation-svc.service';

describe('ModerationSvcController', () => {
  let moderationSvcController: ModerationSvcController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ModerationSvcController],
      providers: [ModerationSvcService],
    }).compile();

    moderationSvcController = app.get<ModerationSvcController>(ModerationSvcController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(moderationSvcController.getHello()).toBe('Hello World!');
    });
  });
});
