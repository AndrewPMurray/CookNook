const express = require('express');
const router = express.Router();
const questions = require('../db/seeders/20220119203615-Question');
const topics = require("../db/seeders/20220119185804-PostTypes");

const { check, validationResult } = require('../utils');

const { csrfProtection, asyncHandler } = require('../utils');
const { User } = require("../db/models");

//Search
router.get('/', csrfProtection, (req, res, next) => {

    // console.log(req.body);

});

router.post('/', )

module.exports = router;
