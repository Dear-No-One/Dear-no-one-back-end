
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment', (table) =>{
    table.increments();
    table.text('content').notNullable();
    table.date('date_commented').notNullable();
    table.integer('member_id').references('member.id').unsigned().onDelete('cascade');
    table.integer('post_id').references('post.id').unsigned().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('comment')
};
