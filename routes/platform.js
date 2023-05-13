const express = require('express');
const router = express.Router();
const platformController = require('../controllers/platform');
// const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', platformController.getAll);
router.get('/:id', platformController.getSingle);

router.post('/', platformController.create);

router.put('/:id', platformController.modify);

router.delete('/:id', platformController.deleteOne);


module.exports = router;
