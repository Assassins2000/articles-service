import { Article } from '../types';
import { TagEntity } from './tag.entity';

export class ArticlesEntity {
  protected readonly id: number;

  protected readonly title: string;

  protected readonly content: string;

  protected readonly isPrivate: boolean;

  protected readonly tags: TagEntity[];

  public getId(): number {
    return this.id;
  }

  constructor(partial: Article) {
    this.id = partial.id;
    this.title = partial.title;
    this.content = partial.content || '';
    this.isPrivate = partial.isPrivate || false;
    this.tags = partial.tags?.map((tag) => new TagEntity(tag)) || [];
  }
}
