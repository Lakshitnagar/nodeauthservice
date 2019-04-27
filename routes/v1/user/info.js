var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');

// Load User model
const User = require('../../../mongodb/models/userModel');

// jwt service
const jwtService = require('../../../jwt/jwtService');

// Load middlewares
const { authenticate } = require('../../../middlewares/_auth');

// Login
router.get('/', authenticate, (req, res) => {

    User.findOne({ uuid: res.locals.uuid }).then(user => {
        const { email } = user;
        if (!user) {
            res.status(400).send({
                error: 'invalid inputs',
                msg: 'no user exists'
            });
        } else {
            res.status(200).send({email});
        }
    });
});

module.exports = router;
