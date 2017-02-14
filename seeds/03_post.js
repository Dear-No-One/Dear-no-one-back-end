var bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "post"; ALTER SEQUENCE post_id_seq RESTART WITH 3;')
    .then(function () {
      var posts = [{
        id: 1,
        title: 'Traveling China On a Dollar',
        body: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
        image_url: 'http://www.travelandtourworld.com/wp-content/uploads/2014/10/chinesetouristshirley.jpg',
        date_posted: new Date(),
        member_id: 2,
        category_id: 1
      },{
        id: 2,
        title: 'My Favorite New Album',
        body: ' The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
        image_url: 'https://s-media-cache-ak0.pinimg.com/originals/39/4b/b4/394bb4dcbca7960b402173b818e90e4f.jpg',
        date_posted: new Date(),
        member_id: 1,
        category_id: 6
      }];
      return knex('post').insert(posts);
    });
};
