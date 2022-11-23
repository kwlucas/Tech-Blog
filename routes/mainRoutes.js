const router = require('express').Router();
const { User, Post, Comment } = require('../models');

//Function to find and return the user that is logged in.
async function getSignedInUser(r) {
    let signedInUser = ''
    //Check if user is signed in
    if (r.session.user_id) {
        //Get user that is signed in
        signedInUser = await User.findByPk(r.session.user_id, {
            //DO not send the user's password data
            attributes: {
                exclude: ['password']
            }
        });
        signedInUser = signedInUser.get({ plain: true });
    }
    return signedInUser;
}

//Base homepage route
router.get('/', async (req, res) => {
    try {
        //Get all posts
        const postData = await Post.findAll({
            //Include the author of the post in the data, but do not send their password data
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
        //Get user that is signed in using function.
        const signedInUser = await getSignedInUser(req);
        //render homepage
        res.render('homepage', { posts, signedInUser });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//View specific post route
router.get('/post/:id', async (req, res) => {
    try {
        //Get specified post
        const postData = await Post.findByPk(req.params.id, {
            //Include the author of the post in the data, but do not send their password data
            include: [{
                model: User,
                attributes: {
                    exclude: ['password']
                }
            },
            //Include the comments on the post in the data along with their author
            {
                model: Comment,
                include: [User],
                order: [
                    ['createdAt', 'DESC']
                ]
            }]
        });
        //Get user that is signed in using function.
        const signedInUser = await getSignedInUser(req);
        //If the post is found
        if (postData) {
            const post = postData.get({ plain: true })
            //Render post display page with the post data
            res.render('viewpost', { post, signedInUser });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//login page route
router.get('/login', (req, res) => {
    //If already signed in redirect to homepage
    if (req.session.user_id) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

//sign up page
router.get('/signup', (req, res) => {
    //If already signed in redirect to homepage
    if (req.session.user_id) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;