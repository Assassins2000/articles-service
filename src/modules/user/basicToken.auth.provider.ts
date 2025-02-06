import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { UserData } from './user.data';
import { UserEntity } from './entities';

// TODO Вынести в отдельный модуль auth
@Injectable()
export class BasicTokenAuthProvider extends PassportStrategy(Strategy) {
  constructor(private readonly userData: UserData) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super();
  }

  async validate(token: string): Promise<UserEntity> {
    const user = await this.userData.getUserByToken(token);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
