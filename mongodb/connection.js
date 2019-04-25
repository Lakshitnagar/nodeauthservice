//mongodb/mongoose
var mongoose = require('mongoose');
var db_config = require('./constants/dburl');
var dbUrl = db_config.LOCAL_DB_URL;
console.log('database address', dbUrl);

mongoose.Promise = require('bluebird');
mongoose.connect(dbUrl);
var db = mongoose.connection;

db.on('error', function () {
  console.log('Database connection error');
});
db.on('open', function () {
    console.log('Database connection established');
});

var status = ['disconnected', 'connected', 'connecting', 'disconnecting'];

module.exports = {
    'connection': mongoose.connection
};

//

//'0': 'disconnected',
//'1': 'connected',
//'2': 'connecting',
//'3': 'disconnecting',
//'99': 'uninitialized'