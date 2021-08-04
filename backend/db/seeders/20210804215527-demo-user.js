'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'Demo-McDemo',
        email: 'demo@harryT.com',
        profileImageUrl: 'https://i.imgur.com/l453Thc.jpg',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        username: 'AndyB',
        email: 'andy@brennan.com',
        profileImageUrl: 'https://i.imgur.com/OmcK4dR.jpg',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        username: 'AudreyH',
        email: 'audrey@horne.com',
        profileImageUrl: 'https://i.imgur.com/tMlGAuJ.jpg',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        username: 'BenH',
        email: 'ben@horne.com',
        profileImageUrl: 'https://i.imgur.com/EsHQLKs.png',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        username: 'BOB',
        email: 'bob@boo.com',
        profileImageUrl: 'https://i.imgur.com/0mbM69p.png',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        username: 'BobbyB',
        email: 'bobby@briggs.com',
        profileImageUrl: 'https://i.imgur.com/yuqHlvW.jpg',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        username: 'Coop',
        email: 'agentCoop@coffee.com',
        profileImageUrl: 'https://i.imgur.com/yjIbeyE.jpg',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        username: 'Don',
        email: 'donna@drama.com',
        profileImageUrl: 'https://i.imgur.com/HenxKNe.jpg',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        username: 'Lucy',
        email: 'lucy@what.com',
        profileImageUrl: 'https://i.imgur.com/Ngbannp.jpg',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        username: 'LogLdy',
        email: 'logs@speak.com',
        profileImageUrl: 'https://i.imgur.com/ZjgxTMp.jpg',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        username: 'LauraP',
        email: 'laura@palmer.com',
        profileImageUrl: 'https://i.imgur.com/FoVJm9k.jpg',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        username: 'Hawk',
        email: 'hawk@mystery.com',
        profileImageUrl: 'https://i.imgur.com/6DjcfvI.jpg',
        hashedPassword: bcrypt.hashSync('password'),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-McDemo', 'AndyB', 'AudreyH', 'BenH', 'BOB', 'BobbyB', 'Coop', 'Don', 'Lucy', 'LogLdy', 'LauraP', 'Hawk'] }
    }, {});
  }
};
