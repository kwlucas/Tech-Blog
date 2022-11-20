const { Comment } = require('../models');

const CommentData = [
    {
        id: 1,
        content: 'First!',
        user_id: 1,
        post_id: 1
    },
    {
        id: 2,
        content: 'Second!',
        user_id: 3,
        post_id: 1
    },
    {
        id: 3,
        content: 'While I think the :has selector is cool, it is really more of a convenience than it is a necessary new feature. Yes, it allows you to select an element above one element, but you could always do that the long way by specifying the exact element you want or some simple JS code. That is probably why it is being implemented slower than something like Container Queries which adds previously impossible functionality.',
        user_id: 4,
        post_id: 2
    },
    {
        id: 4,
        content: 'Still can\'t wait for it to be implemented. I have been working on a pure CSS framework and the has selector would allow me to do so much more with that.',
        user_id: 2,
        post_id: 2
    },
    {
        id: 5,
        content: 'You could always implement it before it gains full support. May not be useable right away, but you can still develope while you wait for browser suppirt.',
        user_id: 3,
        post_id: 2
    },
    {
        id: 6,
        content: 'First!',
        user_id: 1,
        post_id: 3
    },
    {
        id: 7,
        content: 'Thanks for tip!',
        user_id: 3,
        post_id: 3
    },
]

const seedComments = () => Comment.bulkCreate(CommentData);

module.exports = seedComments;