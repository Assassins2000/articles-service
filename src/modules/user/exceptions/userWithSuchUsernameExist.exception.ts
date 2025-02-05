import { BadRequestException } from '@nestjs/common';

export class UserWithSuchUsernameExistException extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}
