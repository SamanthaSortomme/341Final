const router = require('express').Router();
const passport = require('passport');
router.use('/', require('./swagger'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

router.use('/', require('./swagger'));
router.use('/game', require('./game'));
router.use('/user', require('./user'));
router.use('/profile', require('./profile'));

module.exports = router;


//data validation for put and post
// error handling in controllers folder with try catches
// tests on logout tests don't have anything to do with database or 3rd party