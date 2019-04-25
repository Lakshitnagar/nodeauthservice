var mongoose = require('mongoose');
var ipSchema = require('./ipSchema');
var geoLocationSchema = require('./geoLocationSchema');
var timeSchema = require('./timeSchema');

var schema = mongoose.Schema;

var sessionSchema = new schema({
    sessionId: { type: String, require: true },
    enterTime: [timeSchema],
    username: { type: String, default: 'Avatar' },
    age: { type: String, default: null },
    gender: { type: String, default: null },
    yob: { type: Number, default: 0 },
    mob: { type: Number, default: 0 },
    dob: { type: Number, default: 0 },
    ip: [ipSchema],
    geoLocation: [geoLocationSchema]
});

module.exports = sessionSchema;