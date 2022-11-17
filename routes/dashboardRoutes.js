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

router.get('/',withAuth, async (req, res) => {
    try {
        //get the data of user that is signed in
        const signedInUser = await getSignedInUser(req);
        //Get all posts
        const postData = await Post.findAll({
            where: {
                user_id: signedInUser.id
            },
            include: [{
                model: User,
                attributes: {
                    exclude: ['password']
                }
            }]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        //render main dashboard
        res.render('postmanager', { layout: 'dashboard', posts, signedInUser });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/create/:id',withAuth, async (req, res) => {
    try {
        //get the data of user that is signed in
        const signedInUser = await getSignedInUser(req);
        //render new post page
        res.render('newpost', { layout: 'dashboard', signedInUser });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;