const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');

const authMiddleware = require('../middlewares/authentication');

router.post('/', authMiddleware.validToken, itemController.createPost);
router.get('/', itemController.createGet);
router.get('/others', authMiddleware.validToken ,itemController.getOthers);


module.exports = router;
