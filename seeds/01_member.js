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
        dateCreated: new Date(),
        bio: 'Sam is the man',
        category: 1,
        template: 1
      }, {
        id: 2,
        username: 'alex',
        email: 'alex@gmail.com',
        password: bcrypt.hashSync('123', 10),
        dateCreated: new Date(),
        bio: 'Alex is not the man',
        category: 2,
        template: 2
      }];
      return knex('member').insert(members);
    });
};
