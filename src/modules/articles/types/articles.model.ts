import { Tag } from './tag.model';

export interface Article {
  readonly id: number;
  title: string;
  content: string;
  is_private: boolean;
  readonly tags?: Tag[];
}
