'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Albums', [
      {
        title: 'Waves on Waves',
        description: 'Nothing like the water.',
        userId: 1,
      },
      {
        title: 'Hanging With My Friends',
        description: 'Bunch of photogenic buds!',
        userId: 1,
      },
      {
        title: 'Playing With New Camera',
        description: 'Just got a Canon AE-1!',
        userId: 2,
      },
      {
        title: 'Family Vacation',
        description: 'Best part was going off to take photos.',
        userId: 2,
      },
      {
        title: '',
        description: '',
        userId: 3,
      },
      {
        title: '',
        description: '',
        userId: 3,
      },
      {
        title: '',
        description: '',
        userId: 4,
      },
      {
        title: '',
        description: '',
        userId: 4,
      },
      {
        title: '',
        description: '',
        userId: 5,
      },
      {
        title: '',
        description: '',
        userId: 5,
      },
      {
        title: '',
        description: '',
        userId: 6,
      },
      {
        title: '',
        description: '',
        userId: 7,
      },
      {
        title: '',
        description: '',
        userId: 8,
      },
      {
        title: '',
        description: '',
        userId: 9,
      },
      {
        title: '',
        description: '',
        userId: 10,
      },
      {
        title: '',
        description: '',
        userId: 11,
      },
      {
        title: '',
        description: '',
        userId: 12,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Albums', {
      username: { [Op.in]: [] }
    }, {});
  }
};
