'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Albums', [
      {
        title: 'Beaches',
        description: 'water and sand',
        userId: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Animals',
        description: 'all my friends',
        userId: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Light',
        description: 'conversations with light',
        userId: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Albums', null, {});
  }
};
