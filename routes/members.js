var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../config')
var knex = require('../db/knex');
var authHelpers = require('../auth/_helpers')
var localAuth = require('../auth/local')
var reform = require('../functions/reformateUser').reformMember;


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

router.get('/', (req, res, next) => {
    knex('member')
        .select(
            'member.id as memberId',
            'member.username',
            'member.email',
            'member.password',
            'member.bio',
            'member.template',
            'member.theme',
            'member.profilePic',
            'member.blogPic',
            'member.facebook',
            'member.twitter',
            'member.instagram',
            'post.id as postId',
            'post.title',
            'post.body')
        .join('post', 'post.memberId', 'member.id')
        .then(data => {
          const reformatted = reform(data)
            res.json({
                members: reformatted
              });
            // res.json(reformatted);
        });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id
    knex('member')
        .select(
            'member.id as memberId',
            'member.username',
            'member.email',
            'member.password',
            'member.bio',
            'member.template',
            'member.theme',
            'member.profilePic',
            'member.blogPic',
            'member.facebook',
            'member.twitter',
            'member.instagram',
            'post.id as postId',
            'post.title',
            'post.body')
            .where('memberId', id)
        .join('post', 'post.memberId', 'member.id')
        .then(data => {
          const reformatted = reform(data)
          console.log(reformatted);
            res.json({
                member: reformatted
              });
            // res.json(reformatted);
        });
});




module.exports = router;
