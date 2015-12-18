var config = require('../../config/config');
var path    = require("path");
var up = require('../models/userPreferences.js');
var boxes = require('../models/boxes.js');

var templatePath = require.resolve('../views/accueil.jade');
var template = require('jade').compileFile(templatePath);







// HTTP - GET
exports.accueil = function(req, res) {
	var credit = {
			namePage : "Accueil",
			nameSite : "AlarmBox",
			params : {
				isLogged : false,
				calendarExist : false
			}
			
	};
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
					msg.listEvent.sort(function(a,b) {
						return new Date(a.DTSTART) - new Date(b.DTSTART)
					});

					var oneFind = false;	
					
					for (var i = 0; i < msg.listEvent.length; i++) {
						//console.log(i.DTSTART);
						if(msg.listEvent[i].DTSTART > (new Date()).getTime() && !oneFind){
							
							credit.params.event =  msg.listEvent[i];
							oneFind = true;
						}
					};
					if(oneFind){
						up.getalarm(function(r) {
							if(r.alarmTime == null){
								credit.params.AlarmSet = false;
							}else{
								credit.params.AlarmSet = true;
							}

							credit.params.event.DTSTART = new Date(credit.params.event.DTSTART.getTime() +(1*60*60*1000));
							credit.params.alarmTime = new Date(credit.params.event.DTSTART.getTime() - credit.params.timeBeforeFirstEvent*60*1000);
							credit.params.hiddenAlarm = Math.round(credit.params.alarmTime.getTime()/1000);
							console.log(credit.params.AlarmSet);
							res.header("Content-Type", "text/html; charset=utf-8");
							res.write(template(accueil));
						    res.end();
						});
						//up.setalarm(Math.round(credit.params.alarmTime.getTime()/1000));
					}else{
						credit.params.calendarExist =false;

					res.header("Content-Type", "text/html; charset=utf-8");
					res.write(template(accueil));
				    res.end();
					}
					
					
				}
					
			});
		}else{
			res.write(template(accueil));
				    res.end();
		}
		
	});	
}

exports.login = function(req, res) {
	var credit = {
			namePage : "Accueil",
			nameSite : "AlarmBox",
			params : {
				isLogged : false,
				calendarExist : false
			}
			
	};
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