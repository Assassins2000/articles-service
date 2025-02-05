import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { RegisterDto, LoginDto } from './validators-dto';
import { UserService } from './user.service';
import { UserServiceError } from './types';
import { UserEntity } from './entities';

interface LoginResponse {
  user: UserEntity;
  token: string;
}

@Controller('users')
export class AccountEntryController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/login')
  public async login(@Body() signInDto: LoginDto): Promise<LoginResponse> {
    return await this.userService.validateUser(signInDto);
  }

  @Post('/register')
  public async register(
    @Body() registerDto: RegisterDto,
  ): Promise<UserEntity | UserServiceError> {
    return await this.userService.createUser(registerDto);
  }
}
