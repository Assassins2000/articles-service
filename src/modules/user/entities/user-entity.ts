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

  public getEmail(): string {
    return this.email;
  }

  constructor(partial: User) {
    this.id = partial.id;
    this.email = partial.email;
    this.password = partial.password || '';
  }
}
