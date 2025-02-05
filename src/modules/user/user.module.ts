import { Module } from '@nestjs/common';
import { PostgresModule } from '../postgres';
import { AccountEntryController } from './user.controller';
import { UserService } from './user.service';
import { UserData } from './user.data';

@Module({
  imports: [PostgresModule],
  controllers: [AccountEntryController],
  providers: [UserService, UserData],
})
export class UserModule {}
