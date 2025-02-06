import { Injectable } from '@nestjs/common';

import { ArticlesData } from './articles.data';
import { CreateArticlesDto } from './validators-dto';
import { ArticlesServiceErrorCode } from './constants';
import { ArticlesEntity } from './entities';
// import { ArticlesEntity } from './entities';
// import { UserServiceError } from './types';
// import { TagsIdsNotValidEcxpetion } from './exceptions';

@Injectable()
export class ArticlesService {
  constructor(private articlesData: ArticlesData) {}

  public async create(
    data: CreateArticlesDto,
  ): Promise<boolean | ArticlesServiceErrorCode> {
    if ((await this.isTagsValid(data.tagsIds)) === false) {
      return ArticlesServiceErrorCode.tagsIdsNotValid;
    }

    await this.articlesData.create(data);

    return true;
  }

  private async isTagsValid(tagIds: number[]) {
    const tagsCount = await this.articlesData.getTagsByIds(tagIds);
    return tagIds.length === tagsCount;
  }

  public async getById(id: number): Promise<ArticlesEntity> {
    const article = await this.articlesData.getById(id);

    if (!article) {
      throw new Error(ArticlesServiceErrorCode.articleNotFound);
    }

    return article;
  }

  public async getForAuthUsers(queryParams: {
    tagIds?: number[];
  }): Promise<ArticlesEntity[]> {
    if (queryParams.tagIds) {
      return this.articlesData.findByTagIds(queryParams.tagIds);
    }
    return this.articlesData.find();
  }

  public async getForNotAuthUsers(queryParams: {
    tagIds?: number[];
  }): Promise<ArticlesEntity[]> {
    if (queryParams.tagIds) {
      return this.articlesData.findByTagIds(queryParams.tagIds, true);
    }
    return this.articlesData.find(true);
  }

  public async patch(id: number, patchArticlesDto): Promise<boolean> {
    return this.articlesData.patchById(id, patchArticlesDto);
  }

  public async deleteById(id: number): Promise<boolean> {
    return this.articlesData.deleteById(id);
  }
}
