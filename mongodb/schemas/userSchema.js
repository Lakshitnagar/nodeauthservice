var mongoose = require('mongoose');
var sessionSchema = require('./sessionSchema');
var db = require('../connection');
var middleware = require('../middlewares/middleware');

var schema = mongoose.Schema;

var userSchema = new schema({
    uuid: { type: String, require: true },
    sessions: [sessionSchema]
});

userSchema.pre('findOne', middleware.checkDatabaseStability);
//userSchema.pre('findOne', middleware.checkDatabaseStability2);
//userSchema.pre('findOneAndUpdate', middleware.checkDatabaseStability);
userSchema.pre('save', middleware.checkDatabaseStability);

module.exports = userSchema;