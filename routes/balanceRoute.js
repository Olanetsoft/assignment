const express = require('express');
const router = express.Router();

// Require the balance controller handler
const balanceController = require('../controller/balanceController');

// create the routes for balance endpoints
router.get('/balance', balanceController.getBalance);

router.post('/reset', balanceController.reset);


module.exports = router;