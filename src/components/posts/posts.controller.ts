import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostEntity } from './entities/post.entity';
import { NotFoundIfNull } from '../../shared/interceptors/not-found-if-null';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOkResponse({
    type: PostEntity,
    isArray: true,
    description: 'find all posts.',
  })
  findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PostEntity, description: 'find one post.' })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @UseInterceptors(NotFoundIfNull)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBadRequestResponse()
  @ApiOkResponse({ type: CreatePostDto, description: 'find one post.' })
  async create(@Body() postDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.create(postDto);
  }
}
