const express = require('express');
const router = express.Router();

const clientControllers = require('../controllers/client-controller')

router.get('/', clientControllers.getIndex)

router.post('/login', clientControllers.postLogin)

router.get('/register', clientControllers.register)

router.get('/events/:eventId', clientControllers.getInvitation)

module.exports = router;