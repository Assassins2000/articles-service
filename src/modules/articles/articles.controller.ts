import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { ArticlesServiceErrorCode } from './constants';
import { CreateArticlesDto } from './validators-dto';
import { ArticlesService } from './articles.service';

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
}
