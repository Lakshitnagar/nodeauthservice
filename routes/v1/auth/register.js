var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');

// Load User model
const User = require('../../../mongodb/models/userModel');

// jwt service
const jwtService = require('../../../jwt/jwtService');
const uuidService = require('../../../helpers/uuid_helper');

// Load middlewares
const { validateRegisterReq } = require('../../../middlewares/_register');

// Register
router.post('/', validateRegisterReq, (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email }).then(user => {
        if (user) {
            res.status(400).send({
                error: 'invalid inputs',
                msg: 'user aleary exists'
            });
        } else {
            console.log('user');
            const uuid = uuidService.generateUuid();
            const newUser = new User({
                email,
                password,
                uuid
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => {
                            let token = jwtService.generateToken({uuid});
                            // console.log('token', token);
                            
                            // let data = jwtService.verifyToken(token);
                            // console.log('data', data);

                            res.cookie('jwt', token, {httpOnly:true});
                            res.status(201).send({'authToken':'success'});
                        })
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

module.exports = router;
