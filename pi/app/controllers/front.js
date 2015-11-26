var config = require('../../config/config');

var credit = {
		namePage : "Accueil",
		nameSite : "AlarmBox",
		params : {
			isLogged : false
		}
		
};

// HTTP - GET
exports.accueil = function(req, res) {
	if(req.cookies.identifiant != undefined){
		if(req.cookies.identifiant === config.identifiant){
			credit.params.isLogged = true;
		}
	}
	var accueil = {credit : credit};
	console.log(accueil.credit.params);
	
	res.render('accueil', accueil);
	
}

exports.quatrecentquatre = function(req, res){
	res.redirect('/AlarmBox');
}