'use strict';

const { DATE } = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Questions', [
    {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Cooking Chicken",
    postTypeId: 4,
    userId: 5,
    content: "How will I know when my chicken is done? What temp is ideal?",
    createdAt: new Date(),
    updatedAt: new Date() },

    {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "New to Tofu",
    postTypeId: 2,
    userId: 3,
    content: "I am a new to being a vegetarian, is tofu worth trying? What are some good tips?",
    createdAt: new Date(),
    updatedAt: new Date() },

    {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Best way to cook shrimp",
    postTypeId: 8,
    userId: 6,
    content: "I really want to get into being a shrimp person, what are your favorite ways to cook shrimp?",
    createdAt: new Date(),
    updatedAt: new Date() },

    {
      createdAt: new Date(),
      updatedAt: new Date(),
    name: "I really hate cookies",
    postTypeId: 10,
    userId: 1,
    content: "Ever since I was a kid I have always thought cookies were trash, can some one prove me wrong?",
    createdAt: new Date(),
    updatedAt: new Date() },
    {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Break up dessert",
    postTypeId: 10,
    userId: 8,
    content: "Im looking to end it with my wife, does anyone know what the best dessert would be to make while I share this news with her?",
    createdAt: new Date(),
    updatedAt: new Date() },

      {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Best revenge beef",
    postTypeId: 5,
    userId: 2,
    content: "My husband just dumped me over dessert, what should I cook for him to make him regret his choice?",
    createdAt: new Date(),
    updatedAt: new Date() },

    {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Best chicken reciepe to get my parents back together",
    postTypeId: 4,
    userId: 4,
    content: "My parents are splitting up, what chicken dish can I trick them into making that will get them back together?",
    createdAt: new Date(),
    updatedAt: new Date() },

    {
      createdAt: new Date(),
      updatedAt: new Date(),
    name: "Best ways to grill",
    postTypeId: 9,
    userId: 1,
    content: "I got a grill for the first time this summer, what are your favorite grilling tips/tricks?",
    createdAt: new Date(),
    updatedAt: new Date() },

    {
      createdAt: new Date(),
      updatedAt: new Date(),
    name: "Al dente??",
    postTypeId: 3,
    userId: 7,
    content: "New to cooking in general, what exactly is al dente supposed to mean? Is it italian for throwing your pasta at the wall?",
    createdAt: new Date(),
    updatedAt: new Date() },

    {
      createdAt: new Date(),
      updatedAt: new Date(),
    name: "Doctors orders",
    postTypeId: 1,
    userId: 8,
    content: "I havent had a vegetable in 47 years, my doctor is fed up, what is a good vegetable to start with?",
    createdAt: new Date(),
    updatedAt: new Date() },

    {
      createdAt: new Date(),
      updatedAt: new Date(),
    name: "Is this pork bad?",
    postTypeId: 6,
    userId: 5,
    content: "I have had some pork in my fridge for 37 days, its greyish but doesnt smell, is it good?",
    createdAt: new Date(),
    updatedAt: new Date() },

    {
      createdAt: new Date(),
      updatedAt: new Date(),
    name: "best dessert Ive had",
    postTypeId: 10,
    userId: 3,
    content: "When I was 10 we visited Cleaveland for vacation, we had some bacon flavored ice cream, any cleavelanders know where this might have been?",
    createdAt: new Date(),
    updatedAt: new Date() },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
    name: "Am I a bad person",
    postTypeId: 5,
    userId: 9,
    content: "I was recently turned away from a steak house for requesting super heavy duty well done on my filet mignon, am I in the wrong?",
    createdAt: new Date(),
    updatedAt: new Date() },

    {
      createdAt: new Date(),
      updatedAt: new Date(),
    name: "How to deliver feedback",
    postTypeId: 4,
    userId: 1,
    content: "My boyfriend cooks his favorite meal for me every tuesday, it is a gatorade marinated chicken, how can I tell him this is unacceptable and what should I suggest he try instead?",
    createdAt: new Date(),
    updatedAt: new Date() },

    {
      createdAt: new Date(),
      updatedAt: new Date(),
    name: "What vegetable?",
    postTypeId: 1,
    userId: 9,
    content: "If you were attempting to replicate the taste/texture of pork what vegetable would you use as a substitute?",
    createdAt: new Date(),
    updatedAt: new Date() },

    {
      createdAt: new Date(),
      updatedAt: new Date(),
    name: "Haunted foods",
    postTypeId: 6,
    userId: 10,
    content: "Has anyone experienced a food haunting them? I cooked a pork dish years ago and sometimes when I cook other porks I can feel its spirit?",
    createdAt: new Date(),
    updatedAt: new Date() },

  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Questions', null, {});
  }
};
