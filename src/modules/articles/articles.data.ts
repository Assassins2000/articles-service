import { Injectable } from '@nestjs/common';

import { PostgresClient } from '../postgres';
import { CreateArticlesDto } from './validators-dto';
import { Article } from './types';
//import { ArticlesEntity } from './entities';

interface ArticleType {
  article_id: number;
  tag_id: number;
}

@Injectable()
export class ArticlesData {
  constructor(private readonly postgres: PostgresClient) {}

  public async create(data: CreateArticlesDto): Promise<boolean> {
    // В дальнейшем нужно обернуть data в маппер
    const { tagsIds, ...articleData } = data;
    await this.postgres.knex.transaction(async (trx) => {
      const [record] = await trx<Article>('articles')
        .insert(articleData)
        .returning('id');
      await trx<ArticleType>('articles_tags').insert(
        tagsIds.map((tagId) => ({
          article_id: record.id,
          tag_id: tagId,
        })),
      );
    });
    return true;
  }

  // public async getById(id: number): Promise<ArticlesEntity | null> {
  //   const article = await this.postgres
  //     .knex('articles')
  //     .select(

  //     )
  //     .leftJoin(
  //       'article_tags',
  //       'articles_tags.article_id',
  //       'articles_tags.tag_id',
  //     )
  //     .where('id', id);
  // }

  public async getTagsByIds(ids: number[]): Promise<number> {
    const [record] = await this.postgres
      .knex('tags')
      .whereIn('id', ids)
      .count();
    return Number(record.count);
  }
}
