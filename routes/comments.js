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
    if (!req.session.auth) {
        res.redirect('/landing')
    }
    const newAnswer = await Answer.create({
        content: comment, userId, questionId
    })

})


module.exports = router