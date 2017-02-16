
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment', (table) =>{
    table.increments();
    table.text('content').notNullable();
    table.date('dateCommented').notNullable();
    table.integer('memberId').references('member.id').unsigned().onDelete('cascade');
    table.integer('postId').references('post.id').unsigned().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('comment')
};
