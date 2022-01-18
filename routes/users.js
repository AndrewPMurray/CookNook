var express = require('express');
var router = express.Router();
const {csrfProtection, asyncHandler} = require('../utils')
const User;



let errors = [];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('sign-up', {errors});
});

router.post('/', csrfProtection, asyncHandler, async(req, res) => {
  const {userName, email, password, confirmedPassword} = req.body;

  const alreadyUser = await User.findOne({
    where: {email}
  })

  if (alreadyUser) errors.push('Email already created');
  if (!userName) errors.push('Please provide a Username')
  if (!email) errors.push('Please provide an email')
  if (!password) errors.push('Please provide a password')
  if (!confirmedPassword) errors.push('Please confirm Password')
  if (password !== confirmedPassword) errors.push('Passwords do not match')

  if (!errors) {
    const newUser = await User.create({
      userName, email, password
    })
    req.session.user = newUser;
    res.redirect('/')
  }
  errors = [];
  res.redirect('/users')
})

module.exports = router;
