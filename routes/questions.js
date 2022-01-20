var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const { csrfProtection, asyncHandler } = require('../utils')
const db = require('../db/models');

router.post('/', csrfProtection, asyncHandler(async(req, res) => {
    
}))

module.exports = router;