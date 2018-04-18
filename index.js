var express = require('express');
var http = require('http');
var path = require('path');
var Config = require('./config.js');
var Router = require('./router.js');

process.env.NODE_ENV = process.env.NODE_ENV || 'local';

function initConfig() {
    console.log('process.env.NODE_ENV = ', process.env.NODE_ENV);
    return Config.getLocalParam();
}

function init() {
    console.log("start init ............");
    initConfig().then(function(data) {
        console.log('data = ', data);
        if (data) {
            var app = express();
            Config.init(data);
            Router.init(app, data);


            app.set('NODE_ENV', process.env.NODE_ENV);
            app.set('COOKIE_MAX_AGE', data.cookieMaxAge);
            app.set('TOKEN_MAX_AGE', data.tokenMaxAge);

            // view engine setup
            app.set('views', path.join(__dirname, 'views'));
            app.set('view engine', 'ejs');
            if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'local') {
                app.enable('view cache');
            }

            http.createServer(app).listen(data.monitorPort, data.monitorIp);
            console.log('init success');
        } else {
            throw new Error('config data is empty');
        }
    }).done(null, function(err) {
        console.log('init failed, ', err.message);
    });
}

init();

