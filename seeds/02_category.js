var bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "category"; ALTER SEQUENCE category_id_seq RESTART WITH 11;')
    .then(function () {
      var categorys = [{
        id: 1,
        name: 'Travel'
      }, {
        id: 2,
        name: 'Business'
      }, {
        id: 3,
        name: 'Technology'
      }, {
        id: 4,
        name: 'Lifestyle'
      }, {
        id: 5,
        name: 'Health/Fitness'
      }, {
        id: 6,
        name: 'Entertainment'
      }, {
        id: 7,
        name: 'Fashion'
      }, {
        id: 8,
        name: 'Food'
      }, {
        id: 9,
        name: 'Sports'
      }, {
        id: 10,
        name: 'How-To'
      }];
      return knex('category').insert(categorys);
    });
};
