var express = require('express');
var router = express.Router();

// Userlogin controller page require
const Userlogincontroller = require('../Controllers/userController');

// user login router define
router.post('/login', Userlogincontroller.loginController);

module.exports = router;