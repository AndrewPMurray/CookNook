var express = require('express');
var router = express.Router();
const { Question, User, Answer } = require('../db/models')

/* GET home page. */
router.get('/', async (req, res, next) => {

  if (!req.session.auth) {
    return res.redirect('/welcome');
  }

  const questions = await Question.findAll({
    include: User,
    limit: 20,
    order: [['createdAt', 'DESC']]
  });

  const userId = req.session.auth.userId
  const answers = await Answer.findAll({
    include: User
  })

  const users = await User.findAll();

  res.render('index', { users, userId, questions, answers });
});

module.exports = router;
