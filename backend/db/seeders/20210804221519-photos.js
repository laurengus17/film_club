'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Photos', [
      {
        url: 'https://i.imgur.com/bEP2Kpm.jpg',
        title: 'Blue Waves',
        description: 'Shot on 35mm color film. Used my old Minolta from the 80s.',
        userId: 1,
        albumId: 1,
      },
      {
        url: 'https://i.imgur.com/mGUBdUp.jpg',
        title: 'Ocean From Cliff',
        description: 'Shot on 35mm color film. Used my old Minolta from the 80s.',
        userId: 1,
        albumId: 1,
      },
      {
        url: 'https://i.imgur.com/4l3YQAf.jpg',
        title: 'My Friend Paca',
        description: 'Shot on 35mm color film. Used my old Minolta from the 80s.',
        userId: 1,
        albumId: 2,
      },
      {
        url: 'https://i.imgur.com/WxKuuBD.jpg',
        title: 'Hoyt And Boyd',
        description: 'Shot on 35mm color film. Used my old Minolta from the 80s.',
        userId: 1,
        albumId: 2,
      },
      {
        url: 'https://i.imgur.com/mbwZyes.jpg',
        title: 'Expired Film',
        description: 'Shot on my new Canon AE-1.',
        userId: 2,
        albumId: 3,
      },
      {
        url: 'https://i.imgur.com/3wdxzFk.jpg',
        title: 'Sidewalk',
        description: 'Shot on my new Canon AE-1.',
        userId: 2,
        albumId: 4,
      },
      {
        url: 'https://i.imgur.com/2uzIAUM.jpg',
        title: 'Greenhouse',
        description: 'Shot on Kodak.',
        userId: 3,
        albumId: 5,
      },
      {
        url: 'https://i.imgur.com/dlaOvc8.jpg',
        title: 'Redwoods',
        description: 'Shot on Kodak.',
        userId: 3,
        albumId: 6,
      },
      {
        url: 'https://i.imgur.com/SCFcd8n.jpg',
        title: 'Sky',
        description: 'Shot on 35mm.',
        userId: 4,
        albumId: 7,
      },
      {
        url: 'https://i.imgur.com/45jZZZm.jpg',
        title: 'Clouds',
        description: 'Double exposure.',
        userId: 4,
        albumId: 8,
      },
      {
        url: 'https://i.imgur.com/85K5Nb8.jpg',
        title: 'Snow',
        description: 'Portra Film',
        userId: 5,
        albumId: 9,
      },
      {
        url: 'https://i.imgur.com/YlK4oRO.jpg',
        title: 'Wires',
        description: 'Portra Film',
        userId: 5,
        albumId: 10,
      },
      {
        url: 'https://i.imgur.com/BeXskls.jpg',
        title: 'Pine Tree',
        description: '35mm film.',
        userId: 6,
        albumId: 11,
      },
      {
        url: 'https://i.imgur.com/KAAmGJJ.jpg',
        title: 'Flowers',
        description: '35mm film.',
        userId: 7,
        albumId: 12,
      },
      {
        url: 'https://i.imgur.com/diyhCNe.jpg',
        title: 'Motel',
        description: '35mm on Canon',
        userId: 8,
        albumId: 13,
      },
      {
        url: 'https://i.imgur.com/RTYJkGg.jpg',
        title: 'Trianon',
        description: '35mm on Canon',
        userId: 9,
        albumId: 14,
      },
      {
        url: 'https://i.imgur.com/GNiMQj3.jpg',
        title: 'Harvard House',
        description: '35mm',
        userId: 10,
        albumId: 15,
      },
      {
        url: 'https://i.imgur.com/DdiO7K8.jpg',
        title: 'Light Through Leaves',
        description: '35mm',
        userId: 11,
        albumId: 16,
      },
      {
        url: 'https://i.imgur.com/DA7ctYh.jpg',
        title: 'Field',
        description: 'Kodak Color 35mm',
        userId: 12,
        albumId: 17,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Photos', {
      title: { [Op.in]: ['Blue Waves', 'Ocean From Cliff', 'My Friend Paca',
        'Expired Film', 'Sidewalk', 'Greenhouse', 'Redwoods',
        'Sky', 'Clouds', 'Snow', 'Wires', 'Pine Tree', 'Flowers',
        'Motel', 'Trianon', 'Harvard House', 'Light Through Leaves',
        'Field'] }
    }, {});
  }
};
