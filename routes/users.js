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
      .withMessage('Username cannot be longer than 255 characters.'),
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
          const passCheck = /^(?=.*[a-z].*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$/g
          if (!(passCheck.test(value))) {
              throw new Error('Password must contain at least 1 lowercase letter, 1 uppercase letter, a number, and a special character (! @ # $ % ^ & *)')
          }
          return true;
      }),
  check('confirmPassword')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Confirm Password')
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
  const { username, emailAddress, password, confirmedPassword } = req.body;

  const alreadyUser = await User.findOne({
    where: { emailAddress }
  })

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      username, emailAddress, hashedPassword
    })
    req.session.user = newUser;
    req.session.auth = {
      userId: newUser.id,
    };
    res.redirect('/')
  } 
  
  const errors = validatorErrors.array().map((error) => error.msg);

  res.render('sign-up', {
    errors,
    csrfToken: req.csrfToken()
  });
}));


// User Login
const loginValidators = [
  check('emailAddress')
    .exists({ checkFalsy: true })
    .withMessage('Please enter your email address.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please enter your password.'),
]

router.get('/login', csrfProtection, (req, res) => {
  res.render('login', {
    title: 'Login',
    csrfToken: req.csrfToken(),
  })
});

router.post('/login', csrfProtection, loginValidators, asyncHandler(async (req, res) => {
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
        return res.redirect('/');
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

// logout user
router.post('/logout', (req, res) => {
  delete req.session.auth;
  res.redirect('/landing');
});

module.exports = router;
