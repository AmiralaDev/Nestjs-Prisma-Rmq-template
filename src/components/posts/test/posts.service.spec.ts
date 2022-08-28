import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from '../posts.service';
import { PostsController } from '../posts.controller';
import { PrismaModule } from '../../../providers/prisma/prisma.module';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService],
      controllers: [PostsController],
      imports: [PrismaModule],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
