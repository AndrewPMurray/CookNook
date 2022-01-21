const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Question, PostType }= require("../db/models")

const { csrfProtection, asyncHandler } = require('../utils');

//Search

router.get('/', (req, res) => {
    res.render('search');
});

async function searchQuestions(pattern) {
    let matches = [];

    let questions = await Question.findAll();

    for(let i = 0; i < questions.length - 1; i++) {
        let question = questions[i];
        if(question.name.includes(pattern) || question.content.includes(pattern)) {
            matches.push(question);
        };
    };

    let uniqueMatches = [...new Set(matches)];
    return uniqueMatches
};

async function searchTopics(pattern) {
    let matches = [];

    let topics = await PostType.findAll();

    for(let i = 0; i < topics.length - 1; i++) {
        let topic = topics[i];
        if(topic.name === pattern) {
            matches.push(topic);
        };
    };
    let uniqueMatches = [...new Set(matches)];
    return uniqueMatches
};

router.post('/', asyncHandler(async(req, res) => {
    let questionMatches= [];
    let topicMatches = [];

    const { q } = req.body;
    const searchWordsArr = q.slice(0, q.length).split(' ');

    await Promise.all(searchWordsArr.map(async (word) => {
        const questions = await searchQuestions(word)
        const topics = await searchTopics(word)
        questionMatches.push(questions)
        topicMatches.push(topics)
    }));

    console.log(questionMatches);
    console.log(topicMatches);

    //res.render('search', { questions, topics })

}));


module.exports = router;
