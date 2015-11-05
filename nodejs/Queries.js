/*
	Import Https api for http methods
	doc : https://nodejs.org/api/https.html https://nodejs.org/api/http.html
*/
	var https = require('https');
	var querystring = require('querystring');

	//Called by : GET_ics_file.js
	exports.getID = function(callback){

		//Request parameters
		var options = {
			host : 'auth.univ-corse.fr',
			path : '/cas/login',
			port : 443, //SSL Auth
			method: 'GET',
			headers : {
				"User-Agent": "null", //Avoid error 500 on tomcat server
				}
		};

		var req = https.request(options, function(res) {
		/*
			Get response headers
			Extract set_cookie parameters
			Work on the string to get the Session ID

			Example set_cookie : [ 'JSESSIONID=4CF548BF63CB2160E4273; Path=/cas; Secure' ]
		*/
		 	callback(res.headers["set-cookie"][0].split(";")[0].split("=")[1]);
		});

		req.end();
	}

	exports.postCredentials = function(credits, id, callback){

		var postData = querystring.stringify({
			"_eventId" : "submit",
			"lt" : "e1s1",
			"password" : credits.password,
			"submit" : "SE CONNECTER",
			"username" : credits.username

		})
		//Request parameters
		var options = {
			host : 'auth.univ-corse.fr',
			path : '/cas/login',
			port : 443, //SSL Auth
			method: 'POST',
			headers : {
				'Cookie' : "JSESSIONID="+id,
				'Content-Type': 'application/x-www-form-urlencoded',
				"User-Agent": "null", //Avoid error 500 on tomcat server
				}
		};

		var req = https.request(options,function(res){
			//console.log(res.statusCode);
			console.log(res.headers);
			callback();
		});

		req.write(postData);
		req.end();

	}

	exports.getICS = function() {
		//Request parameters
		var options = {
			host : 'reverse-proxy-edt.univ-corse.fr',
			path : 'g515578.html',
			port : 443, //SSL Auth
			method: 'GET',
			headers : {
				"User-Agent": "null", //Avoid error 500 on tomcat server
				}
		};

		var req = https.request(options, function(res) {
			console.log(res.statusCode);
			console.log(res.headers);
			res.on('data', function(d){
				//console.log(d+"");
			})
		});

		req.end();
	};

 
