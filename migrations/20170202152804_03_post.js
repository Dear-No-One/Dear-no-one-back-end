exports.up = function(knex, Promise) {
  return knex.schema.createTable('post', (table) =>{
    table.increments();
    table.text('title').notNullable();
    table.text('body').notNullable();
    table.date('datePosted').notNullable();
    table.integer('memberId').references('member.id').unsigned().onDelete('cascade');
    table.integer('categoryId').references('category.id').unsigned().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('post')
};
