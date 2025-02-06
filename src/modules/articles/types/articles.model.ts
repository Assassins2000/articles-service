import { Tag } from './tag.model';

export interface Article {
  readonly id: number;
  title: string;
  content: string;
  isPrivate: boolean;
  readonly tags?: Tag[];
}
