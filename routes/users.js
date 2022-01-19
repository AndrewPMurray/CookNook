var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { csrfProtection, asyncHandler } = require('../utils')
const { User } = require('../db/models');

/* GET users listing. */
router.get('/', csrfProtection, (req, res, next) => {
  res.render('sign-up', { csrfToken: req.csrfToken() });
});

router.post('/', csrfProtection, asyncHandler, async(req, res) => {
  const {username, emailAddress, password, confirmedPassword} = req.body;

  const alreadyUser = await User.findOne({
    where: { emailAddress }
  });

  if (alreadyUser) errors.push('Email already created');
  if (!username) errors.push('Please provide a Username')
  if (!emailAddress) errors.push('Please provide an email')
  if (!password) errors.push('Please provide a password')
  if (!confirmedPassword) errors.push('Please confirm Password')
  if (password !== confirmedPassword) errors.push('Passwords do not match')

  if (!errors) {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      username, emailAddress, hashedPassword
    })
    req.session.user = newUser;
    res.redirect('/')
  }
  errors = [];
  res.redirect('/users')
})

// User Login
const loginValidators = [
  check('emailAddress')
      .exists({ checkFalsy: true })
      .withMessage('Please provide an email address.'),
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

router.post('/login', csrfProtection, loginValidators, asyncHandler(async(req, res) => {
  // Deconstruct username and password from req object
  const {
    username,
    password
  } = req.body

  let errors = [];
  const validatorErrors = validationResult(req);

  if(validatorErrors.isEmpty()) {
    const user = await db.User.findOne({ where: { username } });

    // Check user credentials
    if (user !== null) {
      const isPassword = await bcrypt.compare(password, user.hashedPassword.toString());

      // verify correct password and login if correct
      if(isPassword) {
        // TODO: set user session
        return res.redirect('/');
      }
    }
    // if username invalid, add error to errors array
    errors.push('Could not login with provided username and password');
  } else {
    // if errors from empty username or password field, map errors to errors array
    errors = validatorErrors.array().map((error) => error.msg);
  }

  // if login invalid, re-render login page w/ email filled in already and show errors
  res.render('login', {
    title: 'Login',
    errors,
    emailAddress,
    csrfToken: req.csrfToken()
  });
}));

module.exports = router;
