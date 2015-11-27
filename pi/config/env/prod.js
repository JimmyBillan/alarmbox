var portHttp = 3000;
var portHttps = 3001;

var ipAllowed = "0.0.0.0";
var sessionSecret = "ef5zeu5kQS3Ay2fz9zf7ze1f3aDaz1fv45rrg6r3za4z8v9e1gD131V3a1za5v8g8y98uloi8hn45a56KUuo65m71cv3n";
var hashPassword = "sha512";

var identifiant= "mdp";
var	ics = null;
var files = null;
var	alarm_time= 3600;


module.exports = {

	setAlarm_time : function(time) {
		alarm_time = time;
	},
	alarm_time : alarm_time,

	getCalendarExist : function() {
		if(ics != null)
			return true;
		else
			return false;
	},
	getCalendar : function() {
		return ics;
	},

	setCalendar : function(isUrl, path) {
		if(isUrl)
			ics = {type:"url", path};
		else
			ics = {type:"file", path};
	},

	identifiant : identifiant,
	portHttp : portHttp,
	portHttps : portHttps,
	ipAllowed : ipAllowed,
	sessionSecret : sessionSecret,
	hashPassword : hashPassword,
	generatePasswordString : function(mail, password) {
		return "HASHAGE_SEULEMENT_POUR_ALARMBOX_PUBLIC_SUR_GITHUB"+mail+"ef1479z12"+password+"3aDa"+mail+"za5v8g8y98uloi"+"E46ZEÉ1VF4e3ef1ez98EF1V0A3A4c1cc6aE13349A411v";
	}
}