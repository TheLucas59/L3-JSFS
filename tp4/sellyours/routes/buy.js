const express = require('express');
const router = express.Router();

const buyController = require('../controllers/buyController');

const authMiddleware = require('../middlewares/authentication');

router.put('/:itemId', authMiddleware.validToken, buyController.buyItem);



module.exports = router;
