import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';

import { POSTGRES_KNEX_INJECT } from './postgres.constants';

@Injectable()
export class PostgresClient {
  @Inject(POSTGRES_KNEX_INJECT)
  private readonly _knex: Knex;

  public get knex(): Knex {
    return this._knex;
  }
}
