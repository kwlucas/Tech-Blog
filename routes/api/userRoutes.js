const router = require('express').Router();
const { User } = require('../../models');

//Route for creating a new user
router.post('/', async (req, res) => {
    try {
        //Create a user using the request body
        const userData = await User.create(req.body);
        //Create/update the session, signing the user in
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.status(201).json(userData);
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'The server encountered an error!' });
    }
});

//Route for signing in an exiting user
router.post('/login', async (req, res) => {
    try {
        //Find user associated with entered username
        const user = await User.findOne({
            where: {
                username: req.body.username,
            }
        });
        //If no user with that username is found respond with error and don't continue processing request
        if (!user) {
            res.status(400).json({ message: 'Invalid user credentials!' }).end();
            return;
        }
        //Check if password is valid
        const validPassword = user.checkPassword(req.body.password);

        //If the provided password is not valid respond with error and don't continue processing request
        if (!validPassword) {
            res.status(400).json({ message: 'Invalid user credentials!' }).end();
            return;
        }
        //Session save, sign the user in
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;

            res.status(200).json({ user, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'The server encountered an error!' });
    }
});

//Route for logging out
router.post('/logout', (req, res) => {
    //If a user is signed in.
    if (req.session.loggedIn) {
        //Destroy the current session, sigining the user out.
        req.session.destroy(() => {
            res.status(204).end();

        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;