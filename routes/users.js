var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const { csrfProtection, asyncHandler } = require('../utils')
const { User } = require('../db/models');

// User Validators
const userValidators = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a username')
    .isLength({ max: 255 })
    .withMessage('Username cannot be longer than 255 characters.')
    .custom((value) => {
      return User.findOne({ where: { username: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided username is already in use by another account');
          }
        })
    }),
  check('emailAddress')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an email address.')
    .isLength({ max: 255 })
    .withMessage('Email cannot be longer than 255 characters.')
    .isEmail()
    .withMessage('Email Address is not a valid email')
    .custom((value) => {
      return User.findOne({ where: { emailAddress: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Email Address is already in use by another account');
          }
        });
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .isLength({ max: 50 })
    .withMessage('Password cannot be more than 50 characters long')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .custom((value) => {
      const passCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$/g
      if (!(passCheck.test(value))) {
        throw new Error('Password must contain at least 1 lowercase letter, 1 uppercase letter, a number, and a special character (! @ # $ % ^ & *)')
      }
      return true;
    }),
  check('confirmedPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please confirm your password')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      }
      return true;
    })
]

/* GET users listing. */
router.get('/', csrfProtection, (req, res, next) => {
  res.render('sign-up', {
    errors: [],
    csrfToken: req.csrfToken()
  });
});

router.post('/', csrfProtection, userValidators, asyncHandler(async (req, res) => {
  const { username, emailAddress, password } = req.body;

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
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
    const errors = validatorErrors.array().map((error) => error.msg);

    res.render('sign-up', {
      errors,
      username,
      emailAddress,
      csrfToken: req.csrfToken()
    });
  }

}));

// logout user
router.post('/logout', (req, res) => {
  delete req.session.auth;
  res.redirect('/welcome');
});

module.exports = router;
