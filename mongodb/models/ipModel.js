var mongoose = require('mongoose');
var ipSchema = require('../schemas/ipSchema');

var ip = mongoose.model('ip', ipSchema);

module.exports = ip;