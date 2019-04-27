var mongoose = require('mongoose');
var sessionSchema = require('./sessionSchema');
// var db = require('../connection');
// var middleware = require('../middlewares/middleware');

var schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    uuid: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    refreshToken: {
        type: String,
        default: null
    }
});

// userSchema.pre('findOne', middleware.checkDatabaseStability);
//userSchema.pre('findOne', middleware.checkDatabaseStability2);
//userSchema.pre('findOneAndUpdate', middleware.checkDatabaseStability);
// userSchema.pre('save', middleware.checkDatabaseStability);

module.exports = userSchema;