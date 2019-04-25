const fs   = require('fs');
const jwt  = require('jsonwebtoken');

// PRIVATE and PUBLIC key
var privateKEY = fs.readFileSync('./jwt/secrets/private.key', 'utf8');
var publicKEY = fs.readFileSync('./jwt/secrets/public.key', 'utf8');
var i = 'Mysoft corp';          // Issuer 
var s = 'some@user.com';        // Subject 
var a = 'http://mysoftcorp.in'; // Audience

// SIGNING OPTIONS
var signOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: "12h",
    algorithm: "RS256"
};

var verifyOptions = {
    issuer:  i,
    subject:  s,
    audience:  a,
    expiresIn:  "12h",
    algorithm:  ["RS256"]
   };

module.exports = {
    generateToken: function(payload){
        var token = jwt.sign(payload, privateKEY, signOptions);
        return token;
    },
    verifyToken: function(token){
        var legit = jwt.verify(token, publicKEY, verifyOptions);
        return legit;
    }
}