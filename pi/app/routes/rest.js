var rest = require('../../app/controllers/rest');

var express = require('express');
var boxes = require('../models/boxes.js');

function requireLogin(req, res, next) {
  
    boxes.login(req.cookies.identifiant, function(isLogged) {
      if(isLogged)
        next();
      else
        console.log("routes rest.js disconnect");
    });
};


module.exports = function(app) {

	app.route('/auth/login').post(rest.loginPost);

	app.use('/auth/*',requireLogin, function(req, res, next){
        next()
    });

    app.route('/auth/ics').post(rest.postICS);
    app.route('/auth/parameter/timeBeforeFirstEvent').post(rest.posttimeBeforeFirstEvent);
    app.route('/auth/parameter/timeForPerfect').post(rest.posttimeForPerfect);

};