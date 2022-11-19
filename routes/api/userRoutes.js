const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

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

router.post('/login', async (req, res) => {
    try {
        //Find user associated with entered username
        const user = await User.findOne({
            where: {
                username: req.body.username,
            },
            attributes: {
                //Fields which won't be included in response data
                exclude: ['password']
            }
        });
        if (!user) {
            res.status(400).json({ message: 'Invalid user credentials!' }).end();
        }
        console.log(user);
        console.log(req.body);
        //Check if password is valid
        const validPassword = user.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Invalid user credentials!' }).end();
        }
        //Session save
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

router.post('/logout', (req, res) => {
    console.log('log out');
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();

        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;