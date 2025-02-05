import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PostgresClient } from '../postgres';
import { RegisterDto } from './validators-dto';
import { User } from './types';
import { UserEntity } from './entities';

@Injectable()
export class UserData {
  constructor(private readonly postgres: PostgresClient) {}

  public async isUserWithUsernameExist(email: string): Promise<boolean> {
    const user: User | undefined = await this.postgres
      .knex<User>('users')
      .select({ email })
      .where('email', email)
      .first();
    return !!user;
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
}
