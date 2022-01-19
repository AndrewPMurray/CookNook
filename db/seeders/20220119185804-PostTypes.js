'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return queryInterface.bulkInsert('PostTypes', [
        {createdAt: new Date(), updatedAt: new Date(), name: 'Vegetables'},
        {createdAt: new Date(), updatedAt: new Date(), name: 'Tofu'},
        {createdAt: new Date(), updatedAt: new Date(), name: 'Pasta'},
        {createdAt: new Date(), updatedAt: new Date(), name: 'Chicken'},
        {createdAt: new Date(), updatedAt: new Date(), name: 'Beef'},
        {createdAt: new Date(), updatedAt: new Date(), name: 'Pork'},
        {createdAt: new Date(), updatedAt: new Date(), name: 'Fish'},
        {createdAt: new Date(), updatedAt: new Date(), name: 'Shellfish'},
        {createdAt: new Date(), updatedAt: new Date(), name: 'Grilling'},
        {createdAt: new Date(), updatedAt: new Date(), name: 'Dessert'}
      ], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
      return queryInterface.bulkDelete('PostTypes', null, {});

  }
};
