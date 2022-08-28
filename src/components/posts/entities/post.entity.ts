import { Post } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class PostEntity implements Post {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty({ required: false, nullable: true })
  title: string | null;

  @ApiProperty({ required: false, nullable: true })
  body: string | null;

  @ApiProperty()
  createdAt: Date;
}
