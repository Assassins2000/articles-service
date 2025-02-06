import { Tag } from '../types';

export class TagEntity {
  protected readonly id: number;

  protected readonly name: string;

  public getId(): number {
    return this.id;
  }

  constructor(partial: Tag) {
    this.id = partial.id;
    this.name = partial.name;
  }
}
