'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Photos', [
      {
        url: 'https://film-aws-bucket.s3-us-west-1.amazonaws.com/rodeo+2-lr-ps.jpg',
        title: 'Rodeo Beach',
        description: 'Light flare at Rodeo Beach, Minolta, Kodak Portra 35mm',
        userId: 13,
        albumId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        url: 'https://film-aws-bucket.s3-us-west-1.amazonaws.com/malibu+2+-lr-ps.jpg',
        title: 'Malibu',
        description: 'Clean waves in Malibu, Nikon, Fujifilm Superia 35mm',
        userId: 13,
        albumId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://film-aws-bucket.s3-us-west-1.amazonaws.com/cats+copy.jpg',
        title: 'Hoyt and Boyd',
        description: 'Hanging with Hoyt and Boyd, Minolta, Kodak Ultra 35mm',
        userId: 13,
        albumId: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://film-aws-bucket.s3-us-west-1.amazonaws.com/paca+up+close.jpg',
        title: 'Paca-Bel',
        description: 'Paca saying hello, Canon, Kodak Ultra 35mm',
        userId: 13,
        albumId: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://film-aws-bucket.s3-us-west-1.amazonaws.com/light+on+gold.jpg',
        title: 'Mount Diablo',
        description: 'Light playing with me, Minolta, Kodak Gold 35mm',
        userId: 13,
        albumId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://film-aws-bucket.s3-us-west-1.amazonaws.com/light+through+corn.jpg',
        title: 'Myrtle Glen',
        description: 'Light through the corn, Minolta, Kodak Ultra 35mm',
        userId: 13,
        albumId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Photos', null, {});
  }
};
