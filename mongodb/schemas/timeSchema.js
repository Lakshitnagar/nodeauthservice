var mongoose = require('mongoose');
var middleware = require('../middlewares/middleware');

var schema = mongoose.Schema;

var timeSchema = new schema({
    time: { type: String, require: true, default: 0 },
    timeZone: { type: String, default: null }
});

//ipSchema.pre('findOne', middleware.checkDatabaseStability);
//userSchema.pre('findOne', middleware.checkDatabaseStability2);
//userSchema.pre('findOneAndUpdate', middleware.checkDatabaseStability);
//ipSchema.pre('save', middleware.checkDatabaseStability);



module.exports = timeSchema;