const express = require('express')
const { csrfProtection, asyncHandler } = require("../utils")
const {Answer} = require("../db/models")

const router = express.Router()


router.post('/', async (req, res) => {
    const {questionId, content} = req.body;

    if (req.session.auth) {
        const userId = req.session.auth
    } else {
        res.redirect('/')
    }
    const newAnswer = await Answer.create({
        content, userId, questionId
    })
    res.redirect('/')
})


module.exports = router
