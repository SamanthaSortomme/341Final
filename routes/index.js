const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
// router.use('/contacts', require('./contacts'));
router.use('/movies', require('./movies'));
router.use('/actors', require('./actors'));

module.exports = router;