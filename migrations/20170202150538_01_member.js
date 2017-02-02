
exports.up = function(knex, Promise) {
  return knex.schema.createTable('member', (table) =>{
    table.increments();
    table.text('username').notNullable();
    table.text('email').unique().notNullable();
    table.text('password').notNullable();
    table.date('date_created').notNullable();
    table.boolean('is_active').notNullable().defaultTo(true);
    table.text('bio');
    table.text('profile_pic');
    table.text('blog_url');
    table.text('facebook');
    table.text('twitter');
    table.text('instagram');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('member')
};
