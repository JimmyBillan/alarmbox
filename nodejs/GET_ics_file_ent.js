var JSESSIONID = require('./Queries.js');
var config = require('config.js'); 

//Get java cookie
JSESSIONID.getID(function(idSession) {
	//Auth to ent
	JSESSIONID.postCredentials({password:config.password,username: config.username}, idSession, function(){
		JSESSIONID.getICS();
	})
});