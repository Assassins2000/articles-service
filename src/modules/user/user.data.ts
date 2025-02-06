import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PostgresClient } from '../postgres';
import { RegisterDto } from './validators-dto';
import { AuthToken, User } from './types';
import { UserEntity } from './entities';

/**
 * Вынести логику, связанную с аутентификацией в отдельный модуль
 */

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

  public async createUser(registerForm: RegisterDto): Promise<boolean> {
    const { email, password } = registerForm;
    const salt = await bcrypt.genSalt(3);
    const hashPassword = await bcrypt.hash(password, salt);

    await this.postgres.knex<User>('users').insert({
      email,
      password: hashPassword,
    });
    return true;
  }

  // TODO: Вынести метод в отдельный провайдер token.data.ts
  public async createToken(userId: number, tokenHash: string): Promise<string> {
    const [record]: AuthToken[] = await this.postgres
      .knex<AuthToken>('auth_tokens')
      .insert({ user_id: userId, token: tokenHash })
      .returning('token');
    return record.token;
  }

  // TODO: Вынести метод в отдельный провайдер token.data.ts
  public async getUserByToken(token: string): Promise<UserEntity | null> {
    const user = await this.postgres
      .knex<User>('users')
      .leftJoin('auth_tokens', 'users.id', '=', 'auth_tokens.user_id')
      .where('auth_tokens.token', token)
      .first<User>();

    return user ? new UserEntity(user) : null;
  }

  // TODO: Вынести методы с isPasswordCompare и getToken в отдельный провайдер
  public async isPasswordCompare(password, passwordHash): Promise<boolean> {
    return bcrypt.compare(password, <string>passwordHash);
  }

  public async getToken(): Promise<string> {
    const salt = await bcrypt.genSalt(3);
    return bcrypt.hash(Date.now().toString(), salt);
  }
}
