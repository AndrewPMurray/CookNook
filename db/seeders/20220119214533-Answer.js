'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Answers', [
    {
      content: "Chicken needs to be 165 degrees at its center to be considered safe, but its a free country",
      userId: 1,
      questionId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      content: "Tofu is better than most flavorless things but is still flavorless",
      userId: 2,
      questionId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      content: "Personally I always put my shrimp on the barbie",
      userId: 8,
      questionId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      content: "Try 8 cups of butter, a gallon of vanilla extract, a handful of sugar, 12 eggs, whatevver flour you have, and just make some cookies man",
      userId: 3,
      questionId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content: "Personally I would try a creme brulee, I have always found that to be calming",
      userId: 2,
      questionId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      content: "The pork is unquestionably bad but it is a free country",
      userId: 3,
      questionId: 11,
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      content: "This is bob's icecream, it was shut down as a front for the mob years ago",
      userId: 8,
      questionId: 12,
      createdAt: new Date(),
      updatedAt: new Date()
    },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Answers', null, {});
  }
};
