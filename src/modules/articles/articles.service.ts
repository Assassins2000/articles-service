import { Injectable } from '@nestjs/common';

import { ArticlesData } from './articles.data';
import { CreateArticlesDto } from './validators-dto';
import { ArticlesServiceErrorCode } from './constants';
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

  // public getById(id: number): Promise<CreateArticlesDto> {}
}
