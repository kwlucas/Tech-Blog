const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {
        if (req.session.userId) {
            const newComment = {
                ...req.body,
                user_id: req.session.userId
            }
            const commentData = await Comment.create(newComment);
            res.status(201).json(commentData);
        }
        else {
            res.status(401).send({ message: 'Unauthorized request!' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'The server encountered an error!' });
    }
});