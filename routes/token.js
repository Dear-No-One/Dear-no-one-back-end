var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../config')
var knex = require('../db/knex');
var authHelpers = require('../auth/_helpers')
var localAuth = require('../auth/local')
// var app = express();

// app.set('superSecret', config.secret);

// router.post('/', function(req, res, next) {
//   console.log(req.body);
//
//   return knex('member').where('email', req.body.auth.email).first()
//       .then(function(member) {
//         console.log(member);
//         console.log(req.body.auth.password);
//         if(bcrypt.compareSync(req.body.auth.password, member.password)) {
//           console.log('yay');
//           // var token = jwt.sign(member, 'shh');
//           var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
//           console.log(token);
//           res.json({
//             token:token
//            });
//
//       } else {
//          next(new Error('Invalid Signin'))
//       }})
//
//
//
//
// });

router.post('/', (req, res, next) => {
  const email = req.body.auth.email;
  const password = req.body.auth.password;
  console.log(req.body);
  return authHelpers.getUser(email)
  .then((response) => {
    authHelpers.comparePass(password, response.password);
    return response;
  })
  .then((response) => { console.log(response, " 1"); return localAuth.encodeToken(response); })
  .then((token) => {
    console.log(token, " 2");
    res.status(200).json({
      status: 'success',
      token: token
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      message: err,
      status: 'error'
    });
  });
});


module.exports = router;
