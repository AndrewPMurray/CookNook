const express = require('express')
const { csrfProtection, asyncHandler } = require("../utils")
const {Answer} = require("../db/models")

const router = express.Router()



router.post('/', async (req, res) => {
    const {questionId, comment} = req.body;

    if (!req.session.auth){
        res.redirect('/landing')
        return;
    }
    const { userId } = req.session.auth

    const newAnswer = await Answer.create({
        content: comment, userId, questionId
    })
    res.redirect('/')
})

router.post('/delete/:id(\\d+)', async(req, res) => {
    const answerId = parseInt(req.params.id, 10);
    console.log(answerId)

    const answer = await Answer.findByPk(answerId);
    await answer.destroy();
    res.redirect('/')
})


module.exports = router
