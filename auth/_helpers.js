const bcrypt = require('bcrypt');
const knex = require('../db/knex');
var localAuth = require('./local')

function createUser(req) {
  const hash = bcrypt.hashSync(req.body.member.password, 10);
  return knex('member')
  .insert({
    username: req.body.member.username,
    email: req.body.member.email,
    password: hash,
    dateCreated: new Date(),
    isActive:true,
    bio:req.body.member.bio,
    category: 1,
    template:req.body.member.template,
    theme:req.body.member.theme,
    profilePic:req.body.member.profilePic,
    blogPic:req.body.member.blogPic,
    facebook:req.body.member.facebook,
    twitter:req.body.member.twitter,
    instagram:req.body.member.instagram
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
      return knex('users').where({id: parseInt(payload.member.id)}).first()
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
