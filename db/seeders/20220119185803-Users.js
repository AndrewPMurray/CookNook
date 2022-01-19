'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return queryInterface.bulkInsert('Users', [
        {createdAt: new Date(), updatedAt: new Date(), username: 'SaraNex', emailAddress: 'sara322@gmail.com', hashedPassword: '$2b$10$Tmv/f5JohlpUpqY8nmmife2iroauu/XiFywoAFpeF4NgOBh3pGRdu'},
        {createdAt: new Date(), updatedAt: new Date(), username: 'EricPho', emailAddress: 'eric566@gmail.com', hashedPassword: '$2b$10$Tmv/f5JohlpUpqY8nmmife2iroauu/XiFywoAFpeF4NgOBh3pGRdu'},
        {createdAt: new Date(), updatedAt: new Date(), username: 'PhilRob', emailAddress: 'philrob455@gmail.com', hashedPassword: '$2b$10$Fmd0a/a9geAkO1OkvCy69uVu/7QyTgdcmVCJ.EvFeRBi3G1PzGVDm'},
        {createdAt: new Date(), updatedAt: new Date(), username: 'MikeHamps', emailAddress: 'michaelham@gmail.com', hashedPassword: '$2b$10$AohL4gLkNZB.Yn42svSnvuN2eY.K73QaZOhwmau/BBdYI1tWLal86'},
        {createdAt: new Date(), updatedAt: new Date(), username: 'PaulGrizz', emailAddress: 'grizzlypaul@gmail.com', hashedPassword: '$2b$10$ErWX9RhJxWNthQ8rLZWSuuw2e7XTMB3y1EDUenTXOiCeQH3KKGiIu'},
        {createdAt: new Date(), updatedAt: new Date(), username: 'HannahReps', emailAddress: 'hannah322@gmail.com', hashedPassword: '$2b$10$NU4UnEEIq4aXrxBEKOtCHOCaXuCi2GAJ2cv1mQ8t3de3ggfkqfRJ.'},
        {createdAt: new Date(), updatedAt: new Date(), username: 'UpperAlligator', emailAddress: 'riky344@gmail.com', hashedPassword: '$2b$10$49bn3J.vRqNRRxM1ngXP/ORAP6WXARfFFPtYZAicqpSduSBizFpge'},
        {createdAt: new Date(), updatedAt: new Date(), username: 'Tony Montana', emailAddress: 'tonymont@gmail.com', hashedPassword: '$2b$10$1QeliIBmM3yHlesRqM7LJOYoUNJkxGlLil.w49pmKN97nrWDfLELa'},
        {createdAt: new Date(), updatedAt: new Date(), username: 'JBelfort', emailAddress: 'jordanbelfort@gmail.com', hashedPassword: '$2b$10$p10kUrFM1AOVqNXY6nZJU.bL4EuIgQKX6u5Mb6ugy9KjYJihKhYzG'},
        {createdAt: new Date(), updatedAt: new Date(), username: 'ORangeMonkey', emailAddress: 'youngMoney@gmail.com', hashedPassword: '$2b$10$..i9WAvDmMxG5FpkoYoPs.k.fK7H4y3HCLhPQvMqWJd07ZqX4EvDW'}
      ], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
*/
      Example:
      return queryInterface.bulkDelete('Users', null, {});

  }
};
