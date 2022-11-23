const router = require('express').Router();
const { Post } = require('../../models');

//Route for create a new post
router.post('/', async (req, res) => {
    try {
         //Ensure that a user is signed in
        if (req.session.user_id) {
            //Create a post object using the request's body and the id of the user that is signed in
            const newPost = {
                ...req.body,
                user_id: req.session.user_id
            }
            //Create a new post with the newPost object
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
//Rount to update a specific post
router.put('/:id', async (req, res) => {
    try {
        //Ensure that a user is signed in
        if (req.session.user_id) {
            //Find a post with the specified id owned by the user that is signed in.
            const postData = await Post.update(req.body, {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id
                }
            });
            //Ternary operate checking if data exists and accordingly responding with the data or a 404
            postData ? res.status(200).json(postData) : res.status(404).send({ message: 'Post not found!' });
        }
        else {
            res.status(401).send({ message: 'Unauthorized request!' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'The server encountered an error!' });
    }
});

//Delete a specified post
router.delete('/:id', async (req, res) => {
    try {
        //Ensure that a user is signed in
        if (req.session.user_id) {
            //Find a post with the specified id owned by the user that is signed in.
            const postData = await Post.destroy({
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id
                }
            });
            //Ternary operate checking if data exists and accordingly responding with the data or a 404
            postData ? res.status(200).json(postData) : res.status(404).send({ message: 'Post not found!' });
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