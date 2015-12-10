var config = require('../../config/config');
var path    = require("path");
var up = require('../models/userPreferences.js');
var boxes = require('../models/boxes.js');



var templatePath = require.resolve('../views/accueil.jade');
var template = require('jade').compileFile(templatePath);



var credit = {
		namePage : "Accueil",
		nameSite : "AlarmBox",
		params : {
			isLogged : false,
			calendarExist : false
		}
		
};



// HTTP - GET
exports.accueil = function(req, res) {
	credit.params.isLogged = true;
	credit.params.calendarExist = config.getCalendarExist();

	up.getuserpreference(function(got) {
		if(got.gotCalendar == 0)
			credit.params.calendarExist = false
		else
			credit.params.calendarExist = true

		credit.params.timeBeforeFirstEvent = got.timeBeforeFirstEvent;
		credit.params.timeForPerfect = got.timeForPerfect;

		var accueil = {credit : credit};
		if(credit.params.calendarExist){
			var parserIcs = require('../lib/parserICS.js');
			parserIcs.loadCalendar(function(err, msg) {
				if(err){
					res.send(msg);
				}else{
					console.log(msg);
					res.header("Content-Type", "text/html; charset=utf-8");
					res.write(template(accueil));
				    res.end();
				}
					
			});
		}
		
	});	
}

exports.login = function(req, res) {
	credit.params.isLogged = false;

	credit.params.calendarExist = false;

	var accueil = {credit : credit};
	res.header("Content-Type", "text/html; charset=utf-8");
	res.write(template(accueil));
    res.end();
};

exports.quatrecentquatre = function(req, res){
	res.redirect('/AlarmBox');
}