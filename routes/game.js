const express = require('express');
const router = express.Router();
const gameController = require('../controllers/user');
// const gameController = require('../controllers/game');
const validation = require('../middleware/validate');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', gameController.getAll);

router.get('/:id', gameController.getSingle);

router.post(
  '/',
  // isAuthenticated,
  validation.saveGame,
  gameController.create
);

router.put(
  '/:id',
  // isAuthenticated,
  validation.saveGame,
  gameController.modify
);

router.delete('/:id', gameController.deleteOne);
// router.delete('/:id', isAuthenticated, gameController.deleteOne);

module.exports = router;
