import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';

import { RegisterDto, LoginDto } from './validators-dto';
import { UserService } from './user.service';
import { UserServiceError } from './types';
import { UserEntity } from './entities';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard('bearer'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/me')
  public getMe(@Request() req: { user: UserEntity }): UserEntity {
    return req.user;
  }

  @Post('/register')
  public async register(
    @Body() registerDto: RegisterDto,
  ): Promise<boolean | UserServiceError> {
    return await this.userService.createUser(registerDto);
  }
}
