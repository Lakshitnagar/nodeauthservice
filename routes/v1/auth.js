var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');

// Load User model
const User = require('../../models/User');

// jwt service
const jwtService = require('../../jwt/jwtService');

// Load middlewares
const { validateRegisterReq } = require('../../middlewares/_register');

// Register
router.post('/register', validateRegisterReq, (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email }).then(user => {
        if (user) {
            res.send({
                error: 'invalid inputs',
                msg: 'user aleary exists'
            });
        } else {
            console.log('hello world');
            console.log('usersss');
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
                            console.log('token', token);
                            
                            let data = jwtService.verifyToken(token);
                            console.log('data', data);
                            
                            // res.cookie('Authorization', token);
                            res.setHeader('Authorization', 'token');
                            res.send({'authToken':token});
                        })
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

module.exports = router;
