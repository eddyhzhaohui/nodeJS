module.exports = Config;

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var Promise = require('promise');


var CONFIG_FILE_NAME = 'BetaShow.conf';
var fs = require('fs');
var path = require('path');

var index = require('./routes/index')

var mountConfig = {
    '/' : __dirname + '/public/html',
    '/public' : __dirname + '/public'
};

var dynamicConfig = {
};


function Config() {

}

Config.init = function(cfg){
};

Config.getLocalParam = function() {
    return Promise.resolve({
        morganLevel : 'combined',
        tokenMaxAge : 60 * 1000,
        cookieMaxAge : 24 * 3600 * 1000,
        localIp : '10.17.71.1', //本地调试tof使用
        monitorIp : '127.0.0.1',
        monitorPort : 3000,
        betaTTSObj: 'MTT.BetaDNNonlineServer.BetaTTSObj@tcp -h 100.65.4.144 -p 10001 -t 60000',
    });
};



// ------------- for router -----------------

Config.getCommonFuncs = function(cfg) {
    return {
        '/' : function(req, res, next) {
            // pass
            next();

        }
    };
};

Config.getMiddlewareList = function(cfg) {
    return {
        morgan : morgan(cfg.morganLevel),
        bodyParser_json : bodyParser.json(), // to support JSON-encoded bodies
        bodyParser_urlencoded : bodyParser.urlencoded({// to support URL-encoded bodies
            extended : true
        }),
        cookie : cookieParser(),
    };
};

Config.getMountConfig = function() {
    return mountConfig;
};

Config.getDynamicConfig = function() {
    return dynamicConfig;
};

