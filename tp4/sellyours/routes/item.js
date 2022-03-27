const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');

const authMiddleware = require('../middlewares/authentication');

router.post('/', authMiddleware.validToken, itemController.createPost);
router.get('/', authMiddleware.validToken, itemController.createGet);
router.get('/others', authMiddleware.validToken ,itemController.getOthers);
router.delete('/:itemId', authMiddleware.validToken, itemController.deleteItem);
router.put('/:itemId/price', authMiddleware.validToken, itemController.changePrice)

module.exports = router;
