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
router.post('/', validateLoginReq, (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email }).then(user => {
        if (!user) {
            res.status(400).send({
                error: 'invalid inputs',
                msg: 'no user exists'
            });
        } else {
            console.log('user', user);
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
                        res.status(200).send({ 'authToken': 'success' });
                    }).catch((err) => {
                        res.status(500).send({
                            error: 'token generation',
                            msg: 'error while generating token'
                        });
                    });
                } else {
                    rres.status(400).send({
                        error: 'invalid inputs',
                        msg: 'incorrect password'
                    });
                }
            });
        }
    });
});

module.exports = router;
