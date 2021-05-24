'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        profileImageUrl: 'https://film-aws-bucket.s3-us-west-1.amazonaws.com/laura+palmer.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        profileImageUrl: 'https://film-aws-bucket.s3-us-west-1.amazonaws.com/leland+palmer.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        profileImageUrl: 'https://film-aws-bucket.s3-us-west-1.amazonaws.com/garland+briggs.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
