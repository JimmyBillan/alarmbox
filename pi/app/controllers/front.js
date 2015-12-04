var config = require('../../config/config');
var path    = require("path");


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

	console.log(req.cookies.identifiant);
	if(req.cookies.identifiant != undefined){
		if(req.cookies.identifiant === config.identifiant){
			credit.params.isLogged = true; 
		}
	}
	credit.params.calendarExist = config.getCalendarExist();

	var accueil = {credit : credit};
	console.log(accueil.credit.params);
	
	res.sendFile(path.join(__dirname+'/../views/accueil.html'));
	console.log("fin");
	//res.render('accueil', accueil);
	
}

exports.quatrecentquatre = function(req, res){
	res.redirect('/AlarmBox');
}