const router = require('express').Router();
const { User, Post } = require('../models');

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
    }
    return signedInUser;
}

router.get('/', async (req, res) => {
    //console.log('home page request hit');
    try {
        //Get all posts
        const posts = await Post.findAll({
            include: [{
                model: User,
                as: 'author',
                attributes: {
                    exclude: ['password']
                }
            }]
        })
        const signedInUser = await getSignedInUser(req);
        //render homepage
        res.render('homepage', { posts, signedInUser });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//login page
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