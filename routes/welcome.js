var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const { csrfProtection, asyncHandler } = require('../utils')
const { User } = require('../db/models');

// User Login
const loginValidators = [
    check('emailAddress')
        .exists({ checkFalsy: true })
        .withMessage('Please enter your email address.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please enter your password.'),
]

router.get('/', csrfProtection, (req, res) => {
    res.render('login', {
        title: 'Login',
        csrfToken: req.csrfToken(),
        errors: []
    })
});

router.get('/demo', asyncHandler(async (req, res) => {
    const username = "DemoUser"
    const emailAddress = "demo@demo.demo"
    const password = "password"
    const demoUser = await User.findOne({ where: { emailAddress } })

    if (demoUser === null) {
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            username, emailAddress, hashedPassword
        })

        const newUser = await User.findOne({ where: { emailAddress } })

        req.session.user = newUser;
        req.session.auth = {
            userId: newUser.id,
        };
        return req.session.save(() => res.redirect('/'))
    } else {
        req.session.auth = {
            userId: demoUser.id,
        };
        req.session.save(() => res.redirect('/'));
    }
}));

router.post('/', csrfProtection, loginValidators, asyncHandler(async (req, res) => {
    // Deconstruct username and password from req object
    const {
        emailAddress,
        password
    } = req.body

    let errors = [];
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        const user = await User.findOne({ where: { emailAddress } });

        // Check user credentials
        if (user !== null) {
            const isPassword = await bcrypt.compare(password, user.hashedPassword.toString());

            // verify correct password and login if correct
            if (isPassword) {
                req.session.auth = {
                    userId: user.id,
                };
                return req.session.save(() => res.redirect('/'));
            }
        }
        // if username invalid, add error to errors array for rendering in html
        errors.push('Could not login with provided username and password');
    } else {
        // if errors from empty username or password field, map errors to errors array
        errors = validatorErrors.array().map((error) => error.msg);
    }

    // if login invalid, re-render login page w/ email filled in already, and show errors

    res.render('login', {
        title: 'Login',
        errors,
        emailAddress,
        csrfToken: req.csrfToken()
    })
}));

module.exports = router;
