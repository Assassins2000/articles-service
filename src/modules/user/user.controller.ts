import { Body, Controller, Post } from '@nestjs/common';

import { RegisterDto } from './validators-dto';
import { UserService } from './user.service';
import { UserServiceError } from './types';
import { UserEntity } from './entities';

@Controller('users')
export class AccountEntryController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  public async register(
    @Body() registerDto: RegisterDto,
  ): Promise<UserEntity | UserServiceError> {
    return await this.userService.createUser(registerDto);
  }
}
