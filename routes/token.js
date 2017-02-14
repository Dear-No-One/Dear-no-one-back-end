var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
/* GET users listing. */
var knex = require('../db/knex');



router.post('/', function(req, res, next) {

  return knex('member').where('email', req.body.email).first()
      .then(function(member) {
        console.log(member);
        console.log(req.body.password);
        if(bcrypt.compareSync(req.body.password, member.password)) {
          console.log('yay');
          res.send({ access_token: "some bs" });

      } else {
         next(new Error('Invalid Signin'))
      }})


});

module.exports = router;
