var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');

// Load User model
const User = require('../../../mongodb/models/userModel');

// jwt service
const jwtService = require('../../../jwt/jwtService');

// Load middlewares
const { validateLoginReq } = require('../../../middlewares/_login');

// Login
router.get('/', (req, res) => {
    res.cookie('jwt', '', { httpOnly: true });
    res.cookie('refreshToken', '', { httpOnly: true });
    res.status(200).send({ 'logout': 'success' });
});

module.exports = router;
