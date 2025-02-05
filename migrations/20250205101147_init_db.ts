import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const { schema } = knex;
  await schema.createTable('users', (table) => {
    table.increments('id').unique().primary();
    table.string('email').unique();
    table.string('password');
  });

  await schema.createTable('articles', (table) => {
    table.increments('id').unique().primary();
    table.string('title');
    table.string('content');
    table.boolean('isPrivate');
    table.boolean('deleted').defaultTo(false);
  });

  await schema.createTable('tags', (table) => {
    table.increments('id').unique().primary();
    table.string('name');
  });

  await schema.createTable('article_tags', (table) => {
    table.integer('articles_id').references('id').inTable('articles');
    table.integer('tag_id').references('id').inTable('tags');
  });
}
