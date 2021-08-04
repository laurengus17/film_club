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
        title: 'Neighborhood Strolls',
        description: 'Walking around snapping pics.',
        userId: 3,
      },
      {
        title: 'All My Favorite Things',
        description: 'Capturing them one by one.',
        userId: 3,
      },
      {
        title: 'Lots Of Light',
        description: 'Playing with high light settings.',
        userId: 4,
      },
      {
        title: 'Travels',
        description: 'Snapshots from different trips.',
        userId: 4,
      },
      {
        title: 'Black And White',
        description: 'Using B&W film.',
        userId: 5,
      },
      {
        title: 'Landscapes',
        description: 'Painting film pictures.',
        userId: 5,
      },
      {
        title: 'The Great Outdoors',
        description: 'Exploring.',
        userId: 6,
      },
      {
        title: 'Around Town',
        description: 'All my favorite spots.',
        userId: 7,
      },
      {
        title: 'Signs',
        description: 'Love a good sign.',
        userId: 8,
      },
      {
        title: 'Nothin Else To Do',
        description: 'Just cuz.',
        userId: 9,
      },
      {
        title: 'Long Drives',
        description: 'Stops along the way.',
        userId: 10,
      },
      {
        title: 'New Camera',
        description: 'Figuring this thing out.',
        userId: 11,
      },
      {
        title: 'Unedited Mix',
        description: 'Photo dump.',
        userId: 12,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Albums', {
      title: { [Op.in]: ['Waves on Waves', 
      'Hanging With My Friends', 'Playing With New Camera', 'Family Vacation',
      'Neighborhood Strolls', 'All My Favorite Things', 'Lots Of Light', 'Travels',
      'Black And White', 'Landscapes', 'The Great Outdoors', 'Around Town', 'Signs',
      'Nothin Else To Do', 'Long Drives', 'New Camera', 'Unedited Mix'] }
    }, {});
  }
};
