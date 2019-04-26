var mongoose = require('mongoose');
var userSchema = require('../schemas/userSchema');

var User = mongoose.model('user', userSchema);

module.exports = User;