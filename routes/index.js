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
router.use('/platform', require('./platform'));
router.use('/profile', require('./profile'));
router.use('/mod', require('./mod'));

module.exports = router;

