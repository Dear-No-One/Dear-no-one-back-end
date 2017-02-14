var bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "vote"; ALTER SEQUENCE vote_id_seq RESTART WITH 3;')
    .then(function () {
      var votes = [{
        id: 1,
        post_id: 2,
        member_id: 2,
      }, {
        id: 2,
        post_id: 1,
        member_id: 1,
      }];
      return knex('vote').insert(votes);
    });
};
