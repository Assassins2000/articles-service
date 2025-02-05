import { Exclude } from 'class-transformer';
import { User } from '../types';

export class UserEntity {
  @Exclude()
  protected readonly password: string;

  protected readonly email: string;

  constructor(partial: User) {
    this.email = partial.email;
    this.password = partial.password || '';
  }
}
