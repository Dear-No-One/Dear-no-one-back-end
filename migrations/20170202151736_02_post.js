
exports.up = function(knex, Promise) {
  return knex.schema.createTable('post', (table) =>{
    table.increments();
    table.text('title').notNullable();
    table.text('body').notNullable();
    table.text('post_url').notNullable();
    table.date('date_posted').notNullable();
    table.integer('member_id').references('member.id').unsigned().onDelete('cascade');
    table.integer('category_id').references('category.id').unsigned().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('post')
};
