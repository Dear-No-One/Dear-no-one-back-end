var express = require('express');
var router = express.Router();

/* GET users listing. */
var knex = require('../db/knex');

router.get('/', function(req, res, next) {
    return knex("member")
        .then(data => {
            var result = {
                users: data
            };
            res.json(result);
        });
});

router.get('/:id', function(req, res, next) {
    let id = req.params.id
    return knex("member").where('id', id).first()
        .then(data => {
            var result = {
                user: data
            };
            res.json(result);
        });
});

module.exports = router;
