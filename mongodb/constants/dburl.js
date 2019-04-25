var DB_NAME = process.env.DB_NAME;
var DB_USERNAME = process.env.DB_USERNAME;
var DB_PASSWORD = process.env.DB_PASSWORD;
// var ENVIRONMENT = process.env.NODE_ENV.trim();

var db_config = {
    "local_url": "mongodb://localhost:27017/yoloapp",
    "mlab_url": "mongodb://heroku_vdg9vrjb:vt0putpfi14ujn6jo2p8sfprfc@ds135433.mlab.com:35433/heroku_vdg9vrjb"
};

var local_db_url = db_config.local_url;
var remote_db_url = db_config.mlab_url;
var global_db_url = local_db_url;
var db_type;

// if (ENVIRONMENT === 'development') {
//     global_db_url = local_db_url;
//     db_type = extractRootDomain(global_db_url);
// }
// else if (ENVIRONMENT === 'production'){
//     global_db_url = remote_db_url;
//     db_type = extractRootDomain(global_db_url);
// }

function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

function extractRootDomain(url) {
    var domain = extractHostname(url),
        splitArr = domain.split('.'),
        arrLen = splitArr.length;

    //extracting the root domain here
    //if there is a subdomain 
    if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
        //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
        if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
            //this is using a ccTLD
            domain = splitArr[arrLen - 3] + '.' + domain;
        }
    }
    return domain.split('.')[0];
}

module.exports.GLOBAL_DB_URL = global_db_url;
module.exports.LOCAL_DB_URL = local_db_url;
module.exports.REMOTE_DB_URL = remote_db_url;
module.exports.DB_TYPE = db_type;