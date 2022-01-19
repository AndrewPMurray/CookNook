var express = require('express');
var router = express.Router();
const {csrfProtection, asyncHandler} = require('../utils')
const bcrypt = require('bcrypt')
const { User } = require('../db/models');



let errors = [];

/* GET users listing. */
router.get('/', csrfProtection, (req, res, next) => {
  res.render('sign-up', {errors, csrfToken: req.csrfToken()});
  errors=[];
});

router.post('/', csrfProtection, asyncHandler(async(req, res) => {
  console.log('working')
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

  if (!errors.length) {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      username, emailAddress, hashedPassword
    })
    req.session.user = newUser;
    res.redirect('/')
  }
  res.redirect('/users')
})
)


module.exports = router;
