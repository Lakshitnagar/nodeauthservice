//Models
var ipModel = require('../models/ipModel');
var userModel = require('../models/userModel');
var sessionModel = require('../models/sessionModel');
var geoLocationModel = require('../models/geoLocationModel');
var timeModel = require('../models/timeModel');
var ErrorModel = require('../../models/error.model');

module.exports = {
    findUserByUuid: findUserByUuid,
    findUserByUuidAndSessionId: findUserByUuidAndSessionId,
    addNewUser: addNewUser,
    addNewSessionByUuid: addNewSessionByUuid,
    addNewTimeInSessionByUuid: addNewTimeInSessionByUuid,
};

// checking
function findUserByUuid(uuid) {
    return new Promise((resolve, reject) => {
        if (!uuid) resolve(null);

        userModel.findOne({ uuid: uuid }, function (err, user) {
            if (err) {
                console.log('error on main operation' + err);
                let dbError = new ErrorModel({
                    code: 503,
                    type: 'database',
                    message: 'something went wrong while looking into database',
                    description: err
                });
                reject(dbError);
            }
            else {
                resolve(user);
            }
        });
    });
}

function findUserByUuidAndSessionId(uuid, sessionId) {
    return new Promise((resolve, reject) => {
        if (!uuid) resolve(null);

        userModel.findOne({
            uuid: uuid,
            'sessions.sessionId': sessionId
        }, function (err, existingUser) {
            if (err) {
                console.log('error on main operation' + err);
                let dbError = new ErrorModel({
                    code: 503,
                    type: 'database',
                    message: 'something went wrong while looking into database',
                    description: err
                });
                reject(dbError);
            }
            else {
                resolve(existingUser);
            }
        });
    });
}

// Adding new
function addNewUser(userInfo, sessionInfo) {
    return new Promise((resolve, reject) => {
        if (!(userInfo && sessionInfo)) resolve(null);

        findUserByUuid(userInfo.uuid).then(function (existingUser) {
            if (!existingUser) {
                var newGeoLocation = geoLocationModel({
                    longitude: sessionInfo.geoLocationInfo && sessionInfo.geoLocationInfo.longitude,
                    latitude: sessionInfo.geoLocationInfo && sessionInfo.geoLocationInfo.latitude,
                    country: sessionInfo.geoLocationInfo && sessionInfo.geoLocationInfo.country,
                    state: sessionInfo.geoLocationInfo && sessionInfo.geoLocationInfo.state,
                    city: sessionInfo.geoLocationInfo && sessionInfo.geoLocationInfo.city,
                    area: sessionInfo.geoLocationInfo && sessionInfo.geoLocationInfo.area
                });

                var newIp = ipModel({
                    ipAddress: sessionInfo.ipInfo && sessionInfo.ipInfo.ipAddress,
                    ipLocation: sessionInfo.ipInfo && sessionInfo.ipInfo.ipLocation
                });

                var newTime = timeModel({
                    time: sessionInfo.timeInfo && sessionInfo.timeInfo.enterTime,
                    timeZone: sessionInfo.timeInfo && sessionInfo.timeInfo.timeZone
                });

                var newSession = sessionModel({
                    sessionId: sessionInfo.sessionId,
                    enterTime: [newTime],
                    username: sessionInfo.username,
                    age: sessionInfo.age,
                    gender: sessionInfo.gender,
                    yob: sessionInfo.yob,
                    mob: sessionInfo.mob,
                    dob: sessionInfo.dob,
                    ip: [newIp],
                    geoLocation: [newGeoLocation]
                });

                var newUser = userModel({
                    uuid: userInfo.uuid,
                    sessions: [newSession]
                });

                newUser.save(function (err, user) {
                    if (err) {
                        console.log('error on main operation' + err);
                        let dbError = new ErrorModel({
                            code: 503,
                            type: 'database',
                            message: 'error on save operation',
                            description: err
                        });
                        reject(dbError);
                    }
                    else {
                        resolve(user);
                    }
                });
            }
            else {
                resolve(null);
            }
        }, function (err) {
            reject(err);
        });

    });
}

function addNewSessionByUuid(uuid, sessionInfo) {
    return new Promise((resolve, reject) => {
        if (!(uuid && sessionInfo)) resolve(null);

        findUserByUuid(uuid).then(function (existingUser) {
            if (existingUser) {
                var newGeoLocation = geoLocationModel({
                    longitude: sessionInfo.geoLocationInfo && sessionInfo.geoLocationInfo.longitude,
                    latitude: sessionInfo.geoLocationInfo && sessionInfo.geoLocationInfo.latitude,
                    country: sessionInfo.geoLocationInfo && sessionInfo.geoLocationInfo.country,
                    state: sessionInfo.geoLocationInfo && sessionInfo.geoLocationInfo.state,
                    city: sessionInfo.geoLocationInfo && sessionInfo.geoLocationInfo.city,
                    area: sessionInfo.geoLocationInfo && sessionInfo.geoLocationInfo.area
                });

                var newIp = ipModel({
                    ipAddress: sessionInfo.ipInfo && sessionInfo.ipInfo.ipAddress,
                    ipLocation: sessionInfo.ipInfo && sessionInfo.ipInfo.ipLocation
                });

                var newTime = timeModel({
                    time: sessionInfo.timeInfo && sessionInfo.timeInfo.enterTime,
                    timeZone: sessionInfo.timeInfo && sessionInfo.timeInfo.timeZone
                });

                var newSession = sessionModel({
                    sessionId: sessionInfo.sessionId,
                    enterTime: [newTime],
                    username: sessionInfo.username,
                    age: sessionInfo.age,
                    gender: sessionInfo.gender,
                    yob: sessionInfo.yob,
                    mob: sessionInfo.mob,
                    dob: sessionInfo.dob,
                    ip: [newIp],
                    geoLocation: [newGeoLocation]
                });

                existingUser.sessions.push(newSession);

                existingUser.save(function (err, updatedUser) {
                    if (err) {
                        console.log('error on main operation' + err);
                        let dbError = new ErrorModel({
                            code: 503,
                            type: 'database',
                            message: 'error on save operation',
                            description: err
                        });
                        reject(dbError);
                    }
                    else {
                        resolve(updatedUser);
                    }
                });
            }
            else {
                resolve(null);
            }
        }, function (err) {
            reject(err);
        });
        
    });
}

function addNewTimeInSessionByUuid(uuid, sessionId, timeInfo) {
    return new Promise((resolve, reject) => {
        if (!(uuid && sessionId && timeInfo)) resolve(null);

        userModel.findOne({
            uuid: uuid,
            'sessions.sessionId': sessionId
        }, function (err, existingUser) {
            if (err) {
                console.log('error on main operation' + err);
                let dbError = new ErrorModel({
                    code: 503,
                    type: 'database',
                    message: 'something went wrong while looking into database',
                    description: err
                });
                reject(dbError);
            }
            else {
                if (existingUser) {
                    var newTime = timeModel({
                        time: timeInfo && timeInfo.time,
                        timeZone: timeInfo && timeInfo.timeZone
                    });

                    for (var i = existingUser.sessions.length - 1; i >= 0; i--) {
                        if (existingUser.sessions[i].sessionId == sessionId) {
                            existingUser.sessions[i].enterTime.push(newTime);
                        }
                    }

                    existingUser.save(function (err, user) {
                        if (err) {
                            console.log('error on main operation' + err);
                            let dbError = new ErrorModel({
                                code: 503,
                                type: 'database',
                                message: 'error on save operation',
                                description: err
                            });
                            reject(dbError);
                        }
                        else {
                            resolve(user);
                        }
                    });
                }
                else {
                    resolve(null);
                }
            }
        });
    });
}

// update existing
function updateUuidInGivenIp(ip, uuid) {
    return new Promise((resolve, reject) => {
    });
}

function updateSessionInGivenUuidAndIp(ip, uuid) {
    return new Promise((resolve, reject) => {
    });
}