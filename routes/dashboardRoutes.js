const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

//Function to find and return the user that is logged in.
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

//Base dashboard route
router.get('/', withAuth, async (req, res) => {
    try {
        //get the data of user that is signed in
        const signedInUser = await getSignedInUser(req);
        //Get all posts that belong to the user that is signed in.
        const postData = await Post.findAll({
            where: {
                user_id: signedInUser.id
            },
            //Include the author in the post data, but do not include their password data.
            include: [{
                model: User,
                attributes: {
                    exclude: ['password']
                }
            }],
            //Arrange the posts by the date they were created. Newest first.
            order: [
                ['createdAt', 'DESC']
            ]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        //render main dashboard
        res.render('postmanager', { layout: 'dashboard', posts, signedInUser });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//Create new post page route
router.get('/create', withAuth, async (req, res) => {
    try {
        //get the data of user that is signed in using function
        const signedInUser = await getSignedInUser(req);
        //render new post page
        res.render('newpost', { layout: 'dashboard', signedInUser });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//Edit post page route
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        //Get specified post
        const postData = await Post.findByPk(req.params.id, {
            //Include the author in the post data, but do not include their password data.
            include: {
                model: User,
                attributes: {
                    exclude: ['password']
                }
            }
        });
        const signedInUser = await getSignedInUser(req);
        //If the post is found
        if (postData) {
            const post = postData.get({ plain: true })
            //Render post display page with the post data
            res.render('editpost', { layout: 'dashboard', post, signedInUser });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;