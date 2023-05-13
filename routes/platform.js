const express = require('express');
const router = express.Router();
const platformController = require('../controllers/platform');
const {savePlatform} = require('../middleware/validateplatform')

router.get('/', platformController.getAll);
router.get('/:id', platformController.getSingle);

router.post("/", savePlatform, platformController.create)

router.put("/:id", savePlatform, platformController.modify)

router.delete('/:id', platformController.deleteOne);


module.exports = router;
