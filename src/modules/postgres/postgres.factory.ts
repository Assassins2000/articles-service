import { POSTGRES_KNEX_INJECT, POSTGRES_POOL } from './postgres.constants';
import createKnexClient, { Knex } from 'knex';
import { ConfigurationService } from '../configuration';

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
  inject: [ConfigurationService],
  provide: POSTGRES_KNEX_INJECT,
  useFactory: (config: ConfigurationService) =>
    createKnexClient(postgresConfig(config)),
};
