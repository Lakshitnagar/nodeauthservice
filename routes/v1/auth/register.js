var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');

// Load User model
const User = require('../../../models/User');

// jwt service
const jwtService = require('../../../jwt/jwtService');

// Load middlewares
const { validateRegisterReq } = require('../../../middlewares/_register');

// Register
router.post('/', validateRegisterReq, (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email }).then(user => {
        if (user) {
            res.send({
                error: 'invalid inputs',
                msg: 'user aleary exists'
            });
        } else {
            console.log('user');
            const newUser = new User({
                email,
                password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => {
                            let token = jwtService.generateToken({email});

                            res.cookie('Authorization', token, {httpOnly:true});
                            res.send({'authToken':'success'});
                        })
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

module.exports = router;
