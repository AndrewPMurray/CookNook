var express = require('express');
var router = express.Router();
const {Question, User, Answer} = require('../db/models')

/* GET home page. */
router.get('/', async (req, res, next) => {
  const questions = await Question.findAll({
  include: User
  })
  questions.forEach(question => {
    const questionId = question.id
  })
  const answers = await Answer.findAll({
    where: {

    }
  })
  res.render('index', {questions});
});

module.exports = router;
