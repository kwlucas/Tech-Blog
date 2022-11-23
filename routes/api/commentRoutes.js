const router = require('express').Router();
const { Comment } = require('../../models');

//Route for creating a comment
router.post('/', async (req, res) => {
    try {
        //Ensure that a user is signed in
        if (req.session.user_id) {
            //Create a comment object using the request's body and the id of the user that is signed in
            const newComment = {
                ...req.body,
                user_id: req.session.user_id
            }
            //Create a new post with the newComment object
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

//Route for deleting a specific comment
router.delete('/:id', async (req, res) => {
    try {
        //Ensure that a user is signed in
        if (req.session.user_id) {
            //Find a comment with the specified id that is owned by the signed in user
            const commentData = await Comment.destroy({
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id
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