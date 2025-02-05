import { Module, OnModuleInit } from '@nestjs/common';

import { POSTGRES_KNEX_INJECT } from './postgres.constants';
import { postgresFactory } from './postgres.factory';
import { PostgresClient } from './postgres.client';
import { ConfigurationModule } from '../configuration';

@Module({
  imports: [ConfigurationModule],
  exports: [PostgresClient, POSTGRES_KNEX_INJECT],
  providers: [postgresFactory, PostgresClient],
})
export class PostgresModule implements OnModuleInit {
  constructor(private readonly postgresClient: PostgresClient) {}

  async onModuleInit() {
    await this.postgresClient.knex.migrate.up();
  }
}
