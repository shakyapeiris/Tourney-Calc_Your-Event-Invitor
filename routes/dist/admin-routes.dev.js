"use strict";

var express = require('express');

var router = express.Router();

var adminContorllers = require('../controllers/admin-controller');

router.get('/:userId', adminContorllers.getAdminPage);
router.post('/add-event', adminContorllers.getAddEvent);
router.post('/add-event-complete', adminContorllers.postAddEvent);
router.get('/:userId/edit-event/:eventId', adminContorllers.getEditEvent);
router.post('/edit-event', adminContorllers.postEditEvent);
router.get('/:userId/delete-event/:eventId', adminContorllers.getDeleteEvent);
module.exports = router;