/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { UserData } from '../user/user.data';
import { UserEntity } from '../user/entities';

@Injectable()
export class OptionalAuthGuard implements CanActivate {
  constructor(private readonly userData: UserData) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const token: string = request.headers.authorization;

    if (token) {
      const user = await this.userData.getUserByToken(
        token.replace(/^Bearer\s+/, ''),
      );
      if (user) {
        request.user = user;
        return true;
      }
    }

    request.user = new UserEntity({ id: 0, email: 'anonumous' });
    return true;
  }
}
