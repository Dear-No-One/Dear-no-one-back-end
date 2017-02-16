var bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "vote"; ALTER SEQUENCE vote_id_seq RESTART WITH 3;')
    .then(function () {
      var votes = [{
        id: 1,
        postId: 2,
        memberId: 2,
      }, {
        id: 2,
        postId: 1,
        memberId: 1,
      }];
      return knex('vote').insert(votes);
    });
};
