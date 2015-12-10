var front = require('../../app/controllers/front');
var boxes = require('../models/boxes.js');

function requireLogin(req, res, next) {
	console.log(req.cookies);
	if(req.cookies.identifiant == undefined || req.cookies.identifiant == null){
		/*console.log(req.cookies.identifiant + "type of : "+ typeof req.cookies.identifiant);
		res.redirect('/alarmbox/login');*/
		front.login(req, res);
	}else{
		boxes.login(req.cookies.identifiant, function(isLogged) {
			if(isLogged)
				next();
			else{
				res.clearCookie("identifiant");
				res.redirect('/alarmbox');
				console.log("route frontjs disconnect");
			}
				
		});
	}
};


module.exports = function(app) {

		//app.route('/alarmbox/login').get(front.login);

		app.use('/alarmbox*',requireLogin, function(req, res, next) {
			next();
		});

		app.route('/alarmbox').get(front.accueil);
		app.route('/').get(front.quatrecentquatre);
};