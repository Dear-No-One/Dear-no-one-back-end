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

module.exports = router;
