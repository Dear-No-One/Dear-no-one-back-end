var express = require('express');
var router = express.Router();
var reform = require('../functions/reformateUser').reformMember;

/* GET users listing. */
var knex = require('../db/knex');

// router.get('/', function(req, res, next) {
//     return knex("member")
//         .then(data => {
//             var result = {
//                 users: data
//             };
//             res.json(result);
//         });
// });

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
            'post.id as postId')
        .join('post', 'post.memberId', 'member.id')
        .then(data => {
          const reformatted = reform(data)
            res.json(reformatted);
            // res.json(reformatted);
        });
});

router.get('/:id', function(req, res, next) {
    let id = req.params.id
    return knex("member").where('id', id).first()
        .then(data => {
            var result = {
                user: data
            };
            res.json(result);
        });
});

module.exports = router;
