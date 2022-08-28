import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaModule } from '../src/providers/prisma/prisma.module';

describe('PostsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/posts', () => {
    it('/posts (GET)', () => {
      return request(app.getHttpServer()).get('/posts').expect(200);
    });
  });

  describe('/posts/:id (GET)', () => {
    it('/posts/:id (GET)', () => {
      return request(app.getHttpServer()).get('/posts/1').expect(200);
    });

    it('should throw bad-request error for invalid post-id', () => {
      return request(app.getHttpServer())
        .get('/posts/some-invalid-integer')
        .expect(400);
    });

    it('should throw proper error for non-existent entity', () => {
      return request(app.getHttpServer())
        .get('/posts/922337203685477500')
        .expect(404);
    });
  });
});
