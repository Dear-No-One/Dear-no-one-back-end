var express = require('express');
var router = express.Router();
var config = require('../config')
var app = express();
var jwt = require('jsonwebtoken');
var localAuth = require('../auth/local')


app.set('superSecret', config.secret);

/* GET users listing. */
var knex = require('../db/knex');
var secret = app.get('superSecret')

router.get('/', function(req, res, next) {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).json({
      status: 'Please log in'
    });
  }
// decode the token
    var header = req.headers.authorization.split(' ');
    var token = header[1];
    localAuth.decodeToken(token, (err, payload) => {
      if (err) {
        return res.status(401).json({
          status: 'Token has expired'
        });
      } else {
        // check if the user still exists in the db
        return knex('member').where({id: parseInt(payload.member.id)}).first()
        .then((member) => {
          return knex("post")
              .then(data => {
                  var result = {
                      blogs: data,
                      members: member
                  };
                  res.json(result);
              });
        })
        .catch((err) => {
          res.status(500).json({
            status: 'error'
          });
        });
      }
    });
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    knex('post').insert({
        title: req.body.blog.title,
        body: req.body.blog.body,
        datePosted: new Date(),
        memberId: 1,
        categoryId: 1
    }).returning('*')
        .then(data => {
        var result = {
            blog: data
        };
        res.json(result);
    });
});


module.exports = router;
