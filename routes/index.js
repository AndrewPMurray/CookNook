var express = require('express');
var router = express.Router();
const {Question, User, Answer} = require('../db/models')

/* GET home page. */
router.get('/', async (req, res, next) => {
  const questions = await Question.findAll({
  include: User
  })
  const answers = await Answer.findAll()
  res.render('index', {questions, answers});
}); //f

module.exports = router;
