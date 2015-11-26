
// HTTP - GET
exports.loginPost = function(req, res) {
	if(req.body.identifiant !=undefined){
		if(req.body.identifiant === "mdp"){
			res.set({identifiant : req.body.identifiant})
			res.sendStatus(200);
		}else
		res.sendStatus(202);
	}else{ 
		res.sendStatus(400);
	}	
}