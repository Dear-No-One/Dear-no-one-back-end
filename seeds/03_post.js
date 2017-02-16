var bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "post"; ALTER SEQUENCE post_id_seq RESTART WITH 3;')
    .then(function () {
      var posts = [{
        id: 1,
        title: 'Traveling China On a Dollar',
        body: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
        datePosted: new Date(),
        memberId: 2,
        categoryId: 1
      },{
        id: 2,
        title: 'My Favorite New Album',
        body: ' The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
        datePosted: new Date(),
        memberId: 1,
        categoryId: 6
      }];
      return knex('post').insert(posts);
    });
};
