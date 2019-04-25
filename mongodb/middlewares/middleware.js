var mongoose = require('mongoose');
//'0': 'disconnected',
//'1': 'connected',
//'2': 'connecting',
//'3': 'disconnecting',
//'99': 'uninitialized'
var status = ['disconnected', 'connected', 'connecting', 'disconnecting'];

module.exports = {
    'checkDatabaseStability': checkDatabaseStability
};

function checkDatabaseStability(next) {
    if (mongoose.connection.readyState == 1) {
        return next();
    }
    else {
        handleDatabaseInstability(next);
    }
}

function handleDatabaseInstability(next) {
    const err = 'Database ' + status[mongoose.connection.readyState];
    next(err);
}