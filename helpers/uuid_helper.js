const uuidv1 = require('uuid/v1');

module.exports = {
    generateUuid: function(){
        return uuidv1();;
    }
}