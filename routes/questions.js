var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');

const { csrfProtection, asyncHandler } = require('../utils')
const { Question, User, Answer, Comment, Like, PostType } = require('../db/models');

router.get('/', csrfProtection, asyncHandler(async (req, res) => {
    if (!req.session.auth) {
        return res.redirect('/welcome');
    }

    const postTypes = await PostType.findAll()

    res.render('question-form', {
        title: "Ask a Question",
        csrfToken: req.csrfToken(),
        postTypes,
    });
}));

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
    const answers = await Answer.findAll();
    const comments = await Comment.findAll();

    res.render('question-page', {
        title: 'Question',
        question,
        answers,
        comments
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
