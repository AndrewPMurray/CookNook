const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { csrfProtection, asyncHandler } = require('../utils')
const { PostType, Question, Answer } = require('../db/models');


router.get('/', async (req, res) => {
    const topics = await PostType.findAll({
    })
    res.render('topics', {topics});
  });

router.get("/:id(\\d*)", asyncHandler(async (req, res) => {

    const topicId = req.params.id;
    const topic = await PostType.findByPk(topicId);
    const questions = await Question.findAll()
    const answers = await Answer.findAll()
    res.render("topic", {topic, questions, answers})
}))


  module.exports = router;
