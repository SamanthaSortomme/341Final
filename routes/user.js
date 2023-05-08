const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', userController.getAll);

router.post('/', isAuthenticated, userController.create);

router.put('/:id', isAuthenticated, userController.modify);

router.delete('/:id', isAuthenticated, userController.deleteOne);

module.exports = router;
