import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from '../posts.controller';
import { PostsService } from '../posts.service';
import { PrismaModule } from '../../../providers/prisma/prisma.module';
import { PrismaClientValidationError } from '@prisma/client/runtime';
import { PostEntity } from '../entities/post.entity';

describe('PostsController', () => {
  let postController: PostsController;
  let postService: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
      imports: [PrismaModule],
    }).compile();

    postController = module.get<PostsController>(PostsController);
    postService = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(postController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      const result: PostEntity[] = [
        {
          id: 1,
          userId: 1,
          title: 'foo',
          body: 'bar',
          createdAt: new Date(),
        },
      ];
      jest.spyOn(postService, 'findAll').mockImplementation(async () => result);
      expect(await postController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return PrismaClientValidationError', async () => {
      await expect(
        postController.findOne(Number('not-a-number')),
      ).rejects.toThrow(PrismaClientValidationError);
    });
    it('should return a post by id', async () => {
      const result: PostEntity = {
        id: 1,
        userId: 1,
        title: 'foo',
        body: 'bar',
        createdAt: new Date(),
      };
      jest.spyOn(postService, 'findOne').mockImplementation(async () => result);
      expect(await postController.findOne(result.id)).toBe(result);
    });
  });
});
