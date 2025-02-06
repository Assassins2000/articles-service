export async function up(knex) {
  //const { schema } = knex;
  await knex.schema.createTable('users', (table) => {
    table.increments('id').unique().primary();
    table.string('email').unique();
    table.string('password');
  });

  await knex.schema.createTable('auth_tokens', (table) => {
    table.increments('id').unique().primary();
    table.integer('user_id').references('id').inTable('users');
    table.string('token');
  });

  await knex.schema.createTable('articles', (table) => {
    table.increments('id').unique().primary();
    table.string('title');
    table.string('content');
    table.boolean('is_private');
    table.boolean('deleted').defaultTo(false);
  });

  await knex.schema.createTable('tags', (table) => {
    table.increments('id').unique().primary();
    table.string('name');
  });

  await knex.schema.createTable('articles_tags', (table) => {
    table
      .integer('article_id')
      .references('id')
      .inTable('articles')
      .onDelete('CASCADE');
    table.integer('tag_id').references('id').inTable('tags');
  });

  await knex('tags').insert(
    Array.from(Array(10).keys()).map((key) => ({
      name: `Тег${key}`,
    })),
  );
}

export async function down() {}
