var express = require('express');
var router = express.Router();
var config = require('../config')
var app = express();

app.set('superSecret', config.secret);

/* GET users listing. */
var knex = require('../db/knex');

router.get('/', function(req, res, next) {
console.log(req.headers['authorization'])
    if (req.headers['authorization'] !== app.get('superSecret')) {
      return res.status(401).send('Unauthorized');
    }

    return knex("post")
        .then(data => {
            var result = {
                blogs: data
            };
            res.json(result);
        });
});
// router.get('/', function(req, res, next) {
//     return knex("member")
//         .then(data => {
//             var result = {
//                 users: data
//             };
//             res.json(result);
//         });
// });
// router.get('/:id', function(req, res, next) {
//     let id = req.params.id
//     return knex("blogs").where('id', id).first()
//         .then(data => {
//             var result = {
//                 blog: data
//             };
//             res.json(result);
//         });
// });

module.exports = router;
