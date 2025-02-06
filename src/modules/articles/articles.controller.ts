import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { ArticlesServiceErrorCode } from './constants';
import { CreateArticlesDto } from './validators-dto';
import { ArticlesService } from './articles.service';
import { ArticlesEntity } from './entities';

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
}
