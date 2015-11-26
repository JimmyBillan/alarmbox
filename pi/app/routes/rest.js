var rest = require('../../app/controllers/rest');

var express = require('express');
var path        = require('path');

function requireLogin (req, res, next) {
  if (req.session === undefined) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};


module.exports = function(app) {

		app.route('/auth/login').post(rest.loginPost);

		app.use('/auth/*',requireLogin, function(req, res, next){
	        next()
	    });

};