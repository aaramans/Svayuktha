require('../models/connect');
var express = require('express');
var router = express.Router();

// Require controller modules
var user_controller = require('../controllers/userController');

router.post('/user/signUp', user_controller.signUp);
router.post('/user/signIn', user_controller.signIn);
router.post('/user/signOut', user_controller.signOut);

module.exports = router;
