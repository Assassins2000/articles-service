import { Module } from '@nestjs/common';
import { PostgresModule } from './modules/postgres';

@Module({
  imports: [PostgresModule],
})
export class AppModule {}
