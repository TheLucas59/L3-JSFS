var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

const authMiddleware = require('../middlewares/authentication');

router.get('/me', authMiddleware.validToken, userController.me)
router.put('/me/money', authMiddleware.validToken, userController.credit)

module.exports = router;
