/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export async function up(knex) {
  //const { schema } = knex;
  await knex.schema.createTable('users', (table) => {
    table.increments('id').unique().primary();
    table.string('email').unique();
    table.string('password');
  });

  await knex.schema.createTable('articles', (table) => {
    table.increments('id').unique().primary();
    table.string('title');
    table.string('content');
    table.boolean('isPrivate');
    table.boolean('deleted').defaultTo(false);
  });

  await knex.schema.createTable('tags', (table) => {
    table.increments('id').unique().primary();
    table.string('name');
  });

  await knex.schema.createTable('article_tags', (table) => {
    table.integer('articles_id').references('id').inTable('articles');
    table.integer('tag_id').references('id').inTable('tags');
  });
}

export async function down() {};
