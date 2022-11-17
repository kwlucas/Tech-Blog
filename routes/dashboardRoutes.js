const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

async function getSignedInUser(r) {
    let signedInUser = ''
    //Check if user is signed in
    if (r.session.user_id) {
        //Get user that is signed in
        signedInUser = await User.findByPk(r.session.user_id, {
            attributes: {
                exclude: ['password']
            }
        });
        signedInUser = signedInUser.get({ plain: true });
    }
    return signedInUser;
}

module.exports = router;