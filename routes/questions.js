var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');

const { csrfProtection, asyncHandler } = require('../utils')
const { Question, User, Answer, Comment, Like } = require('../db/models');

router.get('/', csrfProtection, asyncHandler(async(req, res) => {
    if (!req.session.auth) {
        res.redirect('/landing');
    }
    const postTypes = await db.PostType.findAll()
    res.render('question-form', {
        title: "Ask a Question",
        csrfToken: req.csrfToken(),
        postTypes,
    });
}));

router.post('/', csrfProtection, asyncHandler(async(req, res) => {
    const {
        name,
        postTypeId,
        content,
    } = req.body

    if (req.session.auth) {
        const question = await Question.create({
            name,
            postTypeId,
            userId: req.session.user.id,
            content,
        });

        res.redirect(`/questions/${question.id}`);
    };
    res.redirect('/landing');
}));

router.get('/:id(\\d+)', asyncHandler(async(req, res) => {
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

module.exports = router;