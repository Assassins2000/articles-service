import { Module } from '@nestjs/common';
import { PostgresModule } from '../postgres';
import { AccountEntryController } from './user.controller';
import { BasicTokenAuthProvider } from './basicToken.auth.provider';
import { UserService } from './user.service';
import { UserData } from './user.data';

@Module({
  exports: [BasicTokenAuthProvider, UserData],
  imports: [PostgresModule],
  controllers: [AccountEntryController],
  providers: [BasicTokenAuthProvider, UserService, UserData],
})
export class UserModule {}
