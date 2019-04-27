const fs = require('fs');
const jwt = require('jsonwebtoken');

// PRIVATE and PUBLIC key
var privateKEY = fs.readFileSync('./jwt/secrets/private.key', 'utf8');
var publicKEY = fs.readFileSync('./jwt/secrets/public.key', 'utf8');
var i = 'oloyAuth';          // Issuer 
var s = 'some@user.com';        // Subject 
var a = 'http://oloy.com'; // Audience
var t = 300; // Expire time

// SIGNING OPTIONS
var signOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: t,
    algorithm: "RS256"
};

var verifyOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: t,
    algorithms: ["RS256"]
};

module.exports = {
    generateToken: function (payload) {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, privateKEY, signOptions, function (err, token) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(token);
                }
            });
        });
    },
    verifyToken: function (token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, publicKEY, verifyOptions, function (err, payload) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(payload);
                }
            });
        });
    }
}