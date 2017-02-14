var bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "member"; ALTER SEQUENCE member_id_seq RESTART WITH 3;')
    .then(function () {
      var members = [{
        id: 1,
        username: 'sam',
        email: 'sam@gmail.com',
        password: bcrypt.hashSync('sammyg21', 10),
        date_created: new Date(),
        bio: 'Sam is the man',
      }, {
        id: 2,
        username: 'alex',
        email: 'alex@gmail.com',
        password: bcrypt.hashSync('alexmart05', 10),
        date_created: new Date(),
        bio: 'Alex is not the man',
      }];
      return knex('member').insert(members);
    });
};
