const express = require('express');
const router = express.Router();

//Require the event controller handler
const eventController = require('../controller/eventController');

//create the routes for event endpoints
router.post('/event', eventController.eventActivities);


module.exports = router;