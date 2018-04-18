module.exports = Router;

var express = require('express');
var Config = require('./config.js');
var index = require('./routes/index.js');


function Router() {

}

Router.init = function(app, cfg) {
    Router.registerCommonFuncs(app, cfg);
    Router.initMiddleware(app, cfg);
    Router.mountStaticRes(app, cfg);
    Router.registerDynamicPage(app, cfg);

    // mount routers
    app.use('/', index);
};

Router.registerCommonFuncs = function(app, cfg) {
    var config = Config.getCommonFuncs(cfg);
    for (var i in config) {
        //console.info("registerCommonFuncs key = " + i + ", value = " + config[i]);
        try {
            app.use(i, config[i]);
        } catch (e) {
            console.error("initMiddleware error, key = " + i + ", value = " + config[i] + ", e = " + e.message);
        }
    }
};

Router.initMiddleware = function(app, cfg) {
    var config = Config.getMiddlewareList(cfg);
    for (var i in config) {
        //console.info("initMiddleware key = " + i + ", value = " + config[i]);
        try {
            app.use(config[i]);
        } catch (e) {
            console.error("initMiddleware error, key = " + i + ", value = " + config[i] + ", e = " + e.message);
        }
    }
};

Router.mountStaticRes = function(app, cfg) {
    var config = Config.getMountConfig(cfg);
    for (var i in config) {
        //console.info("mountStaticRes key = " + i + ", value = " + config[i]);
        try {
            app.use(i, express.static(config[i]));
        } catch (e) {
            console.error("mount static resouce error, key = " + i + ", value = " + config[i] + ", e = " + e.message);
        }
    }
};

Router.registerDynamicPage = function(app, cfg) {
    var config = Config.getDynamicConfig(cfg);
    for (var i in config) {
        //console.info("registerDynamicPage key = " + i + ", value = " + config[i]);
        try {
            app.use(i, config[i]);
        } catch (e) {
            console.error("register dynamic page error, key = " + i + ", value = " + config[i] + ", e = " + e.message);
        }
    }
};
