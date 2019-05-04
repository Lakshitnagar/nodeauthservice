var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');

// Load User model
const User = require('../../../mongodb/models/userModel');
const ResponseModel = require('../../../models/response.model');

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
            const infoSuccess = new ResponseModel({
                code: 200,
                type: 'success',
                message: 'info fetched successfully',
                data: {
                    user: email
                }
            });
            res.status(infoSuccess.code).send(infoSuccess);
        }
    });
});

module.exports = router;
