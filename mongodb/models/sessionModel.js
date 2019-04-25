var mongoose = require('mongoose');
var sessionSchema = require('../schemas/sessionSchema');

var session = mongoose.model('session', sessionSchema);

module.exports = session;