import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserData } from './user.data';
import { LoginDto, RegisterDto } from './validators-dto';
import { UserServiceErrorCode } from './constants';
import { UserEntity } from './entities';
import { UserServiceError } from './types';

@Injectable()
export class UserService {
  constructor(private userData: UserData) {}

  public async createUser(
    data: RegisterDto,
  ): Promise<boolean | UserServiceError> {
    const { email } = data;
    if (await this.userData.getUserByEmail(email)) {
      return {
        code: UserServiceErrorCode.UserWithSuchEmailExist,
        message: 'User with such username exists',
      };
    }
    await this.userData.createUser(data);
    return true;
  }

  public async validateUser(data: LoginDto) {
    const { email, password } = data;
    try {
      const user: UserEntity = await this.validateUserByEmailAndPassword(
        email,
        password,
      );
      const hashToken = await this.userData.getToken();
      return {
        token: await this.userData.createToken(user.getId(), hashToken),
        user,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  private async validateUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const user: UserEntity | null = await this.userData.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordsCompare = await this.userData.isPasswordCompare(
      password,
      user.getPassword(),
    );
    if (!isPasswordsCompare) {
      throw new Error('Password not compare');
    }
    return user;
  }
}
