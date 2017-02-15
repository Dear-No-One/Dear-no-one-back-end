var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../config')
var knex = require('../db/knex');

var app = express();

app.set('superSecret', config.secret);

router.post('/', function(req, res, next) {
  console.log(req.body);

  return knex('member').where('email', req.body.email).first()
      .then(function(member) {
        console.log(member);
        console.log(req.body.password);
        if(bcrypt.compareSync(req.body.password, member.password)) {
          console.log('yay');
          var token = jwt.sign(member, app.get('superSecret'));
          res.json({
            success:true,
            message:"enjoy your bbd",
            token:token

           });

      } else {
         next(new Error('Invalid Signin'))
      }})




});

module.exports = router;
