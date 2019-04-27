const uuidv1 = require('uuid/v1');
const uuidv4 = require('uuid/v4');

module.exports = {
    generateTimeUuid: function(){
        return uuidv1();;
    },
    generateRandomUuid: function(){
        return uuidv4();;
    }
}