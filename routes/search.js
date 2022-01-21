const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");


const { csrfProtection, asyncHandler } = require('../utils');

const { Question, PostType, Sequelize }= require("../db/models");

//Search
router.get('/', (req, res) => {
    res.render('search');
});

router.post('/', asyncHandler(async(req, res) => {
    let searchResultsArr = [];

    const { q } = req.body;
    let searchWordsArr = q.slice(0, q.length - 1).split(" ");

    searchWordsArr.forEach(async(word) => {
        const questions = await Question.findAll({
            where: {
                content: {
                    [Op.regexp]: Sequelize.literal(`${word}`)
                }
            }
        });

        const topics = await PostType.findAll({
            where: {
                name: {
                    [Op.regexp]: Sequelize.literal(`${word}`)
                }
            }
        });
        console.log(questions);
        console.log(topics);
    });

}));


module.exports = router;
