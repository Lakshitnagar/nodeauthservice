var mongoose = require('mongoose');
var geoLocationSchema = require('../schemas/geoLocationSchema');

var geoLocation = mongoose.model('geoLocation', geoLocationSchema);

module.exports = geoLocation;