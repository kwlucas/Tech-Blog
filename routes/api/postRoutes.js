const router = require('express').Router();
const { Post } = require('../../models');


router.post('/', async (req, res) => {
    try {
        if (req.session.userId) {
            const newPost = {
                ...req.body,
                user_id: req.session.uderId
            }
            const postData = await Post.create(newPost);
            res.status(201).json(postData);
        }
        else {
            res.status(401).send({ message: 'Unauthorized request!' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'The server encountered an error!' });
    }
});