const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {
        console.log(req.session)
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

router.delete('/:id', async (req, res) => {
    try {
        if (req.session.userId) {
            const commentData = await Comment.destroy({
                where: {
                    id: req.params.id,
                    user_id: req.session.userId
                }
            });
            //Ternary operate checking if data exists and accordingly responding with the data or a 404
            commentData ? res.status(200).json(commentData) : res.status(404).send({ message: 'Comment not found!' });
        }
        else {
            res.status(401).send({ message: 'Unauthorized request!' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'The server encountered an error!' });
    }
});

module.exports = router;