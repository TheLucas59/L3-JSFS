const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');

router.post('/', itemController.create);
router.get('/others', itemController.others );


module.exports = router;
