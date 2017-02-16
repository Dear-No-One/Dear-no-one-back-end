
exports.up = function(knex, Promise) {
  return knex.schema.createTable('member', (table) =>{
    table.increments();
    table.text('username').notNullable().unique();
    table.text('email').unique().notNullable();
    table.text('password').notNullable();
    table.date('dateCreated').notNullable();
    table.boolean('isActive').notNullable().defaultTo(true);
    table.text('bio');
    table.integer('category');
    table.integer('template');
    table.integer('theme');
    table.text('profilePic');
    table.text('blogPic');
    table.text('facebook');
    table.text('twitter');
    table.text('instagram');
  })
};
// express knex 4 lyfe

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('member')
};
