var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../config')
var knex = require('../db/knex');
var authHelpers = require('../auth/_helpers')
var localAuth = require('../auth/local')

router.post('/', (req, res, next)  => {
  console.log(req.body)
  return authHelpers.createUser(req)
  .then((member) => { return localAuth.encodeToken(member[0]); })
  .then((token) => {
    localAuth.decodeToken(token, (err, payload) => {
        res.status(200).json({
          member: payload.member
        });
    })
  })
  .catch((err) => {
    res.status(500).json({
      status: 'error'
    });
  });
});


module.exports = router;
