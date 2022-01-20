var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const { csrfProtection, asyncHandler } = require('../utils')
const db = require('../db/models');

router.get('/', csrfProtection, asyncHandler(async(req, res) => {
    const postTypes = await db.PostType.findAll()
    res.render('question-form', {
        title: "Ask a Question",
        csrfToken: req.csrfToken(),
        postTypes,
    });
}));

router.post('/', csrfProtection, asyncHandler(async(req, res) => {
    
}))

module.exports = router;