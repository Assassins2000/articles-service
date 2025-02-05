import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PostgresClient } from '../postgres';
import { RegisterDto } from './validators-dto';
import { AuthToken, User } from './types';
import { UserEntity } from './entities';

@Injectable()
export class UserData {
  constructor(private readonly postgres: PostgresClient) {}

  public async getUserByEmail(email: string): Promise<UserEntity | null> {
    const user: User | undefined = await this.postgres
      .knex<User>('users')
      .where('email', email)
      .first();
    return user ? new UserEntity(user) : null;
  }

  public async createUser(registerForm: RegisterDto): Promise<UserEntity> {
    const { email, password } = registerForm;
    const salt = await bcrypt.genSalt(3);
    const hashPassword = await bcrypt.hash(password, salt);

    const user: User = await this.postgres.knex<User>('users').insert({
      email,
      password: hashPassword,
    });
    return new UserEntity(user);
  }

  public async createToken(userId: number, tokenHash: string): Promise<string> {
    const [record]: AuthToken[] = await this.postgres
      .knex<AuthToken>('auth_tokens')
      .insert({ user_id: userId, token: tokenHash })
      .returning('token');
    return record.token;
  }

  public async isPasswordCompare(password, passwordHash): Promise<boolean> {
    return bcrypt.compare(password, <string>passwordHash);
  }

  public async getToken(): Promise<string> {
    const salt = await bcrypt.genSalt(3);
    return bcrypt.hash(Date.now().toString(), salt);
  }
}
