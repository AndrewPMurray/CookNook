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

    let uniqueMatches = new Set();
    matches.forEach(question => {
        uniqueMatches.add(question);
    })
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
    let uniqueMatches = new Set();
    matches.forEach(topic => {
        uniqueMatches.add(topic)
    })
    return uniqueMatches
};

router.post('/', asyncHandler(async(req, res) => {
    const { q } = req.body;
    const searchWordsArr = q.slice(0, q.length).split(' ');

    let questions;
    let topics;

    await Promise.all(searchWordsArr.map(async (word) => {
        questions = await searchQuestions(word)
        topics = await searchTopics(word)
    }));

    let qNames = [];
    let qContents = [];

    questions.forEach(question => {
        qNames.push(question.dataValues.name);
        qContents.push(question.dataValues.content);
    });

    let topicNames = [];
    topics.forEach(topic => {
        topicNames.push(topic.dataValues.name);
    });

    console.log(q)
    console.log(qNames)
    console.log(qContents)
    console.log(topicNames)

    res.render('search', { q, qNames, qContents, topicNames })
}));


module.exports = router;
