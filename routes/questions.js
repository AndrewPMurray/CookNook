var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const { csrfProtection, asyncHandler } = require('../utils')
const db = require('../db/models');

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
        const question = await db.Question.create({
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
    const question = await db.Question.findByPk(questionId, {
        include: {
            model: db.Answer
        }
    })

    res.render('question-page', {
        title: 'Question',
        question,
    });

}));

module.exports = router;