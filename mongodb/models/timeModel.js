var mongoose = require('mongoose');
var timeSchema = require('../schemas/timeSchema');

var time = mongoose.model('time', timeSchema);

module.exports = time;