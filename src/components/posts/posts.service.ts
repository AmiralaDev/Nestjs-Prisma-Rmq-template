import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { PostEntity } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}
  findAll(): Promise<PostEntity[]> {
    return this.prisma.post.findMany();
  }

  findOne(id: number): Promise<PostEntity> {
    return this.prisma.post.findUnique({ where: { id } });
  }

  create(data: CreatePostDto): Promise<PostEntity> {
    return this.prisma.post.create({
      data,
    });
  }
}
