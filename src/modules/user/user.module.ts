import { Module } from '@nestjs/common';
import { PostgresModule } from '../postgres';

@Module({
  imports: [PostgresModule],
  controllers: [],
  providers: [],
})
export class UserModule {}
