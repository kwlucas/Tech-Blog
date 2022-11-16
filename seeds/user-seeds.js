const { User } = require('../models');

const userData = [
    {
        username: 'IamTheFirst',
        password: 'Password1'
    },
    {
        username: 'WebDevGirl',
        password: 'Password2'
    },
    {
        username: 'Base2Binary',
        password: 'Password3'
    },
    {
        username: 'TheAncientGeek',
        password: 'Password4'
    },
];

const seedUsers = () => User.bulkCreate(userData, { hooks: false, individualHooks: true });

module.exports = seedUsers;