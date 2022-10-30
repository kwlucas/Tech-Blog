const router = require('express').Router();
const { User, Post } = require('../models');


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
        let signedInUser = ''
        //Check if user is signed in
        if(req.session.user_id){
            //Get user that is signed in
            signedInUser = await User.findByPk(req.session.user_id, {
                attributes: {
                    exclude: ['password']
                }
            });
        }
        //render homepage
        res.render('homepage', { posts, signedInUser });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});