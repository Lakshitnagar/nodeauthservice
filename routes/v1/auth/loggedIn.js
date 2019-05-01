var express = require('express');
var router = express.Router();

// Load User model
const User = require('../../../mongodb/models/userModel');

// Load middlewares
const { authenticate } = require('../../../middlewares/_auth');

// Is Logged in
router.get('/check', authenticate, (req, res) => {
    res.status(200).send({isLoggedIn:true});
});

module.exports = router;
