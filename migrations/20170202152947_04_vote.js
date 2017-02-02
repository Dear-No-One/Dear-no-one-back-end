
exports.up = function(knex, Promise) {
  return knex.schema.createTable('vote', (table) =>{
    table.increments();
    table.integer('post_id').references('post.id').unsigned().onDelete('cascade');
    table.integer('member_id').references('member.id').unsigned().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('vote')
};
