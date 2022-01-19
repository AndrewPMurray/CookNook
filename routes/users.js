var express = require('express');
var router = express.Router();
<<<<<<< HEAD
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { csrfProtection, asyncHandler } = require('../utils')
const { User } = require('../db/models');
const db = require('../db/models');
=======
const {csrfProtection, asyncHandler} = require('../utils')
const bcrypt = require('bcrypt')
const { User } = require('../db/models');
>>>>>>> signup-branch



let errors = [];

/* GET users listing. */
<<<<<<< HEAD
router.get('/', csrfProtection, function(req, res, next) {
  res.render('sign-up', {errors});
=======
router.get('/', csrfProtection, (req, res, next) => {
  res.render('sign-up', {errors, csrfToken: req.csrfToken()});
>>>>>>> signup-branch
});

router.post('/', csrfProtection, asyncHandler, async(req, res) => {
  const {username, emailAddress, password, confirmedPassword} = req.body;

  const alreadyUser = await User.findOne({
    where: {emailAddress}
  })

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

<<<<<<< HEAD
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
  const {
    emailAddress,
    password
  } = req.body

  let errors = [];
  const validatorErrors = validationResult(req);

  if(validatorErrors.isEmpty()) {
    const user = await db.User.findOne({ where: { emailAddress } });

    if (user !== null) {
      const isPassword = await bcrypt.compare(password, user.hashedPassword.toString());

      if(isPassword) {
        // TODO: set user session
        return res.redirect('/');
      }
    }
    errors.push('Could not login with provided username and password');
  } else {
    errors = validatorErrors.array().map((error) => error.msg);
  }

  res.render('login', {
    title: 'Login',
    errors,
    emailAddress,
    csrfToken: req.csrfToken()
  });
}));
=======
>>>>>>> signup-branch

module.exports = router;
