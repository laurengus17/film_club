'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        content: 'Great light!',
        userId: 8,
        imageId: 1,
      },
      {
        content: 'Love that spot.',
        userId: 9,
        imageId: 1,
      },
      {
        content: 'Great camera angle.',
        userId: 3,
        imageId: 1,
      },
      {
        content: 'Careful on the edge.',
        userId: 5,
        imageId: 2,
      },
      {
        content: 'Good colors.',
        userId: 6,
        imageId: 2,
      },
      {
        content: 'No way!',
        userId: 4,
        imageId: 2,
      },
      {
        content: 'That girl hates me.',
        userId: 4,
        imageId: 3,
      },
      {
        content: 'Where was this?',
        userId: 9,
        imageId: 3,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Comments', {
      content: { [Op.in]: ['Great light!', 'Love that spot.', 'Great camera angle.',
      'Careful on the edge.', 'Good colors.', 'No way!',
      'That girl hates me.', 'Where was this?'] }
    }, {});
  }
};
