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
    
    res.render('topics', {topics});
});

router.get("/:id(\\d*)", asyncHandler(async (req, res) => {
  if (!req.session.auth) {
    return res.redirect('/welcome');
  }
  
  const topicId = req.params.id;
  const topic = await PostType.findByPk(topicId);
  const users = await User.findAll()
  const userId = req.session.auth.userId
  const questions = await Question.findAll({
      include: User,
      limit: 20,
      order: [['createdAt', 'DESC']]
      })
  const answers = await Answer.findAll({
      include: User
     })
  res.render("topic", { topic, questions, answers, users, userId })
}))


module.exports = router;
