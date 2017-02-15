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
  // var token = req.headers['authorization']
  // var somestuff = jwt.decoded(token)
  // // console.log(somestuff);
  // console.log('one ', app.get('superSecret'));
  // console.log('two ', req.headers['authorization']);
  //   if (req.headers['authorization'] !== 'Bearer ' + secret ) {
  //     return res.status(401).send('Unauthorized');
  //   }
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
        return knex('member').where({id: parseInt(payload.sub)}).first()
        .then((member) => {
          return knex("post")
              .then(data => {
                  var result = {
                      blogs: data
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


// jwt.verify(token, app.get('superSecret'), function(err, decoded) {
//   if (err) {
//     return res.json({ success: false, message: 'Failed to authenticate token.' });
//   } else {
//     // if everything is good, save to request for use in other routes
//     req.decoded = decoded;
//     next();
//   }
// });
// {fuck : 'fuck'}

module.exports = router;
