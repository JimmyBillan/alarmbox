var backend = require('../../app/controllers/backend');
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

		app.route('/auth/login').get(front.login).post(front.loginPost);

		app.use('/auth/*',requireLogin, function(req, res, next){
	        next()
	    });

		app.route('/auth/panel').get(backend.panel);
		app.route('/auth/logout').get(backend.logout);

		app.route('/auth/card/:id*?').post(backend.addCard).get(backend.getCard).put(backend.updateCard).delete(backend.deleteCard);
};