import { Injectable } from '@nestjs/common';

import { UserData } from './user.data';
import { RegisterDto } from './validators-dto';
import { UserServiceErrorCode } from './constants';
import { UserEntity } from './entities';
import { UserServiceError } from './types';

@Injectable()
export class UserService {
  constructor(private userData: UserData) {}

  public async createUser(
    data: RegisterDto,
  ): Promise<UserEntity | UserServiceError> {
    const { email } = data;
    if (await this.userData.isUserWithUsernameExist(email)) {
      return {
        code: UserServiceErrorCode.UserWithSuchEmailExist,
        message: 'User with such username exists',
      };
    }
    const user: UserEntity = await this.userData.createUser(data);
    return user;
  }
}
