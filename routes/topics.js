const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { csrfProtection, asyncHandler } = require('../utils')
const { PostType, Question, Answer, User } = require('../db/models');


router.get('/', async (req, res) => {
  if (!req.session.auth) {
    return res.redirect('/welcome');
  }

  const topics = await PostType.findAll()

  res.render('topics', { topics });
});

router.get("/:id(\\d*)", asyncHandler(async (req, res) => {
  if (!req.session.auth) {
    return res.redirect('/welcome');
  }
  
  const topicId = req.params.id;
  const topic = await PostType.findByPk(topicId);
  const users = await User.findAll()
  const questions = await Question.findAll()
  const answers = await Answer.findAll(
    {
      include: Question,

    })
  console.log(answers)
  res.render("topic", { topic, questions, answers, users })
}))


module.exports = router;
