import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { OptionalAuthGuard } from './optionalAuthGuard';
import { ArticlesServiceErrorCode } from './constants';
import { CreateArticlesDto, QueryParamsDto } from './validators-dto';
import { ArticlesService } from './articles.service';
import { ArticlesEntity } from './entities';
import { UserEntity } from '../user/entities';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @UseGuards(AuthGuard('bearer'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('create')
  public async create(
    @Body() createArticlesDto: CreateArticlesDto,
  ): Promise<boolean | ArticlesServiceErrorCode> {
    return await this.articlesService.create(createArticlesDto);
  }

  @UseGuards(AuthGuard('bearer'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  public async getById(@Param('id') id: number): Promise<ArticlesEntity> {
    return this.articlesService.getById(id);
  }

  @UseGuards(OptionalAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  public async get(
    @Request() req: { user: UserEntity },
    @Query() params: QueryParamsDto,
  ): Promise<ArticlesEntity[]> {
    if (req.user.getEmail() === 'anonumous') {
      return this.articlesService.getForNotAuthUsers(params);
    }
    return this.articlesService.getForAuthUsers(params);
  }
}
