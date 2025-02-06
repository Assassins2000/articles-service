import { Injectable } from '@nestjs/common';

import { PostgresClient } from '../postgres';
import { CreateArticlesDto } from './validators-dto';
import { Article } from './types';
import { ArticlesEntity } from './entities';
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

  public async getById(id: number): Promise<ArticlesEntity | null> {
    const article = await this.postgres
      .knex<Article>('articles')
      .select({
        id: 'articles.id',
        title: 'articles.title',
        content: 'articles.content',
        isPrivate: 'articles.is_private',
        tags: this.postgres.knex.raw('to_json(array_agg(tags))'),
      })
      .leftJoin(
        'articles_tags',
        'articles_tags.article_id',
        'articles_tags.tag_id',
      )
      .leftJoin('tags', 'articles_tags.tag_id', 'tags.id')
      .where('articles.id', id)
      .groupBy('articles.id')
      .first<Article>();

    return new ArticlesEntity(article);
  }

  public async getTagsByIds(ids: number[]): Promise<number> {
    const [record] = await this.postgres
      .knex('tags')
      .whereIn('id', ids)
      .count();
    return Number(record.count);
  }
}
