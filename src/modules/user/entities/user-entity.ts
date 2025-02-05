import { Exclude } from 'class-transformer';
import { User } from '../types';

export class UserEntity {
  protected readonly id: number;

  @Exclude()
  protected readonly password: string;

  protected readonly email: string;

  public getPassword(): string {
    return this.password;
  }

  public getId(): number {
    return this.id;
  }

  constructor(partial: User) {
    this.email = partial.email;
    this.password = partial.password || '';
  }
}
