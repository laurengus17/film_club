'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Photos', [
      {
        url: '',
        title: '',
        description: 'Shot on 35mm color film. Used my old Minolta from the 80s.',
        userId: 1,
        albumId: 1,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Photos', {
      username: { [Op.in]: [] }
    }, {});
  }
};
