const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Question, PostType }= require("../db/models")

const { csrfProtection, asyncHandler } = require('../utils');

router.get('/', (req, res) => {
    res.render('search');
});

async function searchQuestions(pattern) {
    let matches = [];

    let questions = await Question.findAll();

    for(let i = 0; i < questions.length; i++) {
        let question = questions[i];
        if(question.name.toLowerCase().includes(pattern) || question.content.toLowerCase().includes(pattern)) {
            matches.push(question);
        };
    };

    let uniqueMatches = new Set();
    matches.forEach(question => {
        uniqueMatches.add(question);
    })
    return uniqueMatches
};

async function searchTopics(pattern) {
    let matches = [];

    let topics = await PostType.findAll();

    for(let i = 0; i < topics.length; i++) {
        let topic = topics[i];
        if(topic.name.toLowerCase() === pattern) {
            matches.push(topic);
        };
    };
    let uniqueMatches = new Set();
    matches.forEach(topic => {
        uniqueMatches.add(topic)
    })
    return uniqueMatches
};

router.post('/', asyncHandler(async(req, res) => {
    const { q } = req.body;
    const searchWord = q.toLowerCase();
    const searchWordsArr = searchWord.slice(0, searchWord.length).split(' ');

    let questions;
    let topics;

    await Promise.all(searchWordsArr.map(async (word) => {
        questions = await searchQuestions(word)
        topics = await searchTopics(word)
    }));

    let qData = [];

    questions.forEach(question => {
        const questionInfo = {
            name: question.dataValues.name,
            id: question.dataValues.id,
            content: question.dataValues.content
        }
        qData.push(questionInfo);
    });

    let topicNames = [];
    topics.forEach(topic => {
        topicNames.push(topic.dataValues.name.toLowerCase());
    });

    res.render('search', { q, qData, topicNames })
}));


module.exports = router;
