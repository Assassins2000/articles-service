import { Module } from '@nestjs/common';
import { PostgresModule } from '../postgres';
import { UserModule } from '../user';
import { ArticlesController } from './articles.controller';
import { BasicTokenAuthProvider } from '../user/basicToken.auth.provider';
import { ArticlesService } from './articles.service';
import { ArticlesData } from './articles.data';

@Module({
  imports: [PostgresModule, UserModule],
  controllers: [ArticlesController],
  providers: [BasicTokenAuthProvider, ArticlesService, ArticlesData],
})
export class ArticlesModule {}
