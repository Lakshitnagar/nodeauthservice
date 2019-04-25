var mongoose = require('mongoose');
var db = require('../connection');
var middleware = require('../middlewares/middleware');

var schema = mongoose.Schema;

var ipSchema = new schema({
    ipAddress: { type: String, required: true },
    ipLocation: { type: Object, default: null }
});

//ipSchema.pre('findOne', middleware.checkDatabaseStability);
//userSchema.pre('findOne', middleware.checkDatabaseStability2);
//userSchema.pre('findOneAndUpdate', middleware.checkDatabaseStability);
//ipSchema.pre('save', middleware.checkDatabaseStability);



module.exports = ipSchema;