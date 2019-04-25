var mongoose = require('mongoose');
var middleware = require('../middlewares/middleware');

var schema = mongoose.Schema;

var geoLocationSchema = new schema({
    longitude: { type: String, default: null },
    latitude: { type: String, default: null },
    country: { type: String, default: null },
    state: { type: String, default: null },
    city: { type: String, default: null },
    area: { type: String, default: null }
});

//ipSchema.pre('findOne', middleware.checkDatabaseStability);
//userSchema.pre('findOne', middleware.checkDatabaseStability2);
//userSchema.pre('findOneAndUpdate', middleware.checkDatabaseStability);
//ipSchema.pre('save', middleware.checkDatabaseStability);



module.exports = geoLocationSchema;