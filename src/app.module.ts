import { Module } from '@nestjs/common';
import { PostgresModule } from './modules/postgres';
import { UserModule } from './modules/user';

@Module({
  imports: [PostgresModule, UserModule],
})
export class AppModule {}
