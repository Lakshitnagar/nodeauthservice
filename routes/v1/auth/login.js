var express = require('express');
var router = express.Router();
const ResponseModel = require('../../../models/response.model');

const bcrypt = require('bcryptjs');

// Load User model
const User = require('../../../mongodb/models/userModel');

// jwt service
const jwtService = require('../../../jwt/jwtService');

// Load middlewares
const { validateLoginReq } = require('../../../middlewares/_login');

// Login
router.post('/', validateLoginReq, (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email }).then(user => {
        if (!user) {
            res.status(400).send({
                error: 'invalid inputs',
                msg: 'no user exists'
            });
        } else {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    if (!user.refreshToken) {
                        res.status(401).send({
                            error: 'unauthorized',
                            msg: 'account suspended'
                        });

                        return;
                    }
                    jwtService.generateToken({ uuid: user.uuid }).then((token) => {
                        res.cookie('jwt', token, { httpOnly: true });
                        res.cookie('refreshToken', user.refreshToken, { httpOnly: true });
                        const loginSuccess = new ResponseModel({
                            code: 200,
                            type: 'success',
                            message: 'login successful',
                            data: {
                                isAuth: true
                            }
                        });
                        res.status(loginSuccess.code).send(loginSuccess);
                    }).catch((err) => {
                        res.status(500).send({
                            error: 'token generation',
                            msg: 'error while generating token'
                        });
                    });
                } else {
                    res.status(400).send({
                        error: 'invalid inputs',
                        msg: 'incorrect password'
                    });
                }
            });
        }
    });
});

module.exports = router;
