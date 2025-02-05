import { POSTGRES_KNEX_INJECT, POSTGRES_POOL } from './postgres.constants';
import createKnexClient, { Knex } from 'knex';
import { ConfigurationModule, ConfigurationService } from '../configuration';

export const postgresConfig = (config: ConfigurationService): Knex.Config => ({
  client: 'pg',
  connection: {
    connectionString: config.getPostgresURI(),
  },
  pool: {
    max: POSTGRES_POOL,
  },
});

export const postgresFactory = {
  imports: [ConfigurationModule],
  inject: [ConfigurationService],
  provide: POSTGRES_KNEX_INJECT,
  useFactory: (config: ConfigurationService) =>
    createKnexClient(postgresConfig(config)),
};
