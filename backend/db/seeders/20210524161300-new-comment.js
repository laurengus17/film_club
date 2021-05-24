'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        content: 'I love the Light Flare!',
        userId: 13,
        imageId: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'The light at that beach is always amazing.',
        userId: 13,
        imageId: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
