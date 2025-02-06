import { Module } from '@nestjs/common';
import { PostgresModule } from './modules/postgres';
import { UserModule } from './modules/user';
import { ArticlesModule } from './modules/articles';

@Module({
  imports: [PostgresModule, ArticlesModule, UserModule],
})
export class AppModule {}
