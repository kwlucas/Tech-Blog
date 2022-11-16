const { Post } = require('../models');

const postData = [
    {
        id: 1,
        title: 'First!',
        content: 'This is the first post on this blog. That really does\'t have any significance, but it is true. This is the very first post on this blog site.',
        user_id: 1
    },
    {
        id: 2,
        title: 'Full support for ":has()"?!',
        content: 'The new CSS :has selector will revolutionize CSS styling. It brings the long awaited ability to elect previous parent and sibling elements to the table. However, despite being so revolutionaty the psudo-class has not yet recieved support from all the major web browsers and thus cannot be brought into the full commercial industry. Chrome has in the past few months finally implemented after having it as a test feature for a time. However, Firefox still has yet to do so. The mobile browsers, Firefox Android, and Samsung Internet also have yet to make any sort of implementation of the :has() selector. Hopefully they implement it soon, but I guess all we can do is wait.',
        user_id: 2
    },
    {
        id: 3,
        title: 'Remeber to enable hooks! (SQL seeding)',
        content: 'After struggling to determine why I could not sign in with any of the users I had seeded in on a site I have been working on, I decided to make a post about it. When you use SQL/Sequlize DB and seed it using the "bulkCreate" method you need to remember that by default any hooks you may have do not run for each entry when you use bulkCreate. You can make the hooks run for each entry by setting the "individualHooks" option to true.',
        user_id: 4
    },
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;