import { Test, TestingModule } from '@nestjs/testing';
import { CommentSvcController } from './comment-svc.controller';
import { CommentSvcService } from './comment-svc.service';

describe('CommentSvcController', () => {
  let commentSvcController: CommentSvcController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CommentSvcController],
      providers: [CommentSvcService],
    }).compile();

    commentSvcController = app.get<CommentSvcController>(CommentSvcController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(commentSvcController.getHello()).toBe('Hello World!');
    });
  });
});
