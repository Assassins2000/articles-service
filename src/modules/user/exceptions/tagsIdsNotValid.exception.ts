import { BadRequestException } from '@nestjs/common';

export class TagsIdsNotValidEcxpetion extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}
