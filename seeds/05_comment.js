var bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "comment"; ALTER SEQUENCE comment_id_seq RESTART WITH 3;')
    .then(function () {
      var comments = [{
        id: 1,
        content: 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        date_commented: new Date(),
        member_id: 1,
        post_id: 1
      }, {
        id: 2,
        content: 'The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        date_commented: new Date(),
        member_id: 2,
        post_id: 2
      }];
      return knex('comment').insert(comments);
    });
};
