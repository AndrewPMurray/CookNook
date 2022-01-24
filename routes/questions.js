var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');

const { csrfProtection, asyncHandler } = require('../utils')
const { Question, User, Answer } = require('../db/models');

router.get('/', async(req, res) => {
  if (!req.session.auth) {
      res.redirect('/welcome');
  }
  const questions = await Question.findAll({
    include: User,
    limit: 20,
    order: [['createdAt', 'DESC']]
  })

  const users = await User.findAll();

  res.render('question-feed', { users, questions });
});

router.post('/', csrfProtection, asyncHandler(async (req, res) => {
    if (!req.session.auth) {
        return res.redirect('/welcome');
    }

    const {
        name,
        postTypeId,
        content,
    } = req.body

    const question = await Question.create({
        name,
        postTypeId,
        userId: req.session.auth.userId,
        content,
    });
    return req.session.save(() => res.redirect(`/questions/${question.id}`));

}));

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    if (!req.session.auth) {
        return res.redirect('/welcome');
    }

    const questionId = parseInt(req.params.id, 10);
    const question = await Question.findOne({
        include: User,
        where: {
            id: questionId
        }
    });

    const userId = req.session.auth.userId
    const users = await User.findAll();

    const answers = await Answer.findAll({
        include: User
      })

    res.render('question-page', {
        questionId,
        question,
        answers,
        userId,
        users
    });


}));

router.post('/delete/:id(\\d+)', async (req, res) => {
    const questionId = parseInt(req.params.id, 10);

    const answers = await Answer.findAll({
        where: {
            questionId
        }
    })
    answers.forEach(answer => answer.destroy())
    const question = await Question.findByPk(questionId);
    await question.destroy();
    res.redirect('/')
})

module.exports = router;
