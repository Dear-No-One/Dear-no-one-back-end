const bcrypt = require('bcrypt');
const knex = require('../db/knex');
var localAuth = require('./local')

function createUser(req) {
  const hash = bcrypt.hashSync(req.body.signup.password, 10);
  return knex('member')
  .insert({
    username: req.body.signup.username,
    email: req.body.signup.email,
    password: hash,
    dateCreated: new Date(),
    isActive:true,
    bio:req.body.signup.bio,
    category:req.body.signup.category,
    template:req.body.signup.template,
    theme:req.body.signup.theme,
    profilePic:req.body.signup.profilePic,
    blogPic:req.body.signup.blogPic,
    facebook:req.body.signup.facebook,
    twitter:req.body.signup.twitter,
    instagram:req.body.signup.instagram
  })
  .returning('*');
}



function getUser(email) {
  return knex('member').where({email}).first();
}

function comparePass(userPassword, databasePassword) {
  const bool = bcrypt.compareSync(userPassword, databasePassword);
  if (!bool) throw new Error('bad pass silly money');
  else return true;
}

function ensureAuthenticated(req, res, next) {
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
      return knex('users').where({id: parseInt(payload.sub)}).first()
      .then((user) => {
        next();
      })
      .catch((err) => {
        res.status(500).json({
          status: 'error'
        });
      });
    }
  });
}

module.exports = {
  createUser,
  getUser,
  comparePass,
  ensureAuthenticated
};
