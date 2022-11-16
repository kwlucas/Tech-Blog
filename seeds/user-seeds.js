const { User } = require('../models');

const userData = [
    {
        id: 1,
        username: 'IamTheFirst',
        password: 'Password1'
    },
    {
        id: 2,
        username: 'WebDevGirl',
        password: 'Password2'
    },
    {
        id: 3,
        username: 'Base2Binary',
        password: 'Password3'
    },
    {
        id: 4,
        username: 'TheAncientGeek',
        password: 'Password4'
    },
];

const seedUsers = () => User.bulkCreate(userData, { hooks: false, individualHooks: true });

module.exports = seedUsers;