process.env.NODE_ENV = process.env.NODE_ENV || 'prod';
process.env.TZ = 'Europe/Paris';
require('use-strict')


var config 		= require('./config/config');
var express     = require('./config/express');
var path 		= require('path');
var app         = express();

var sqlite3 = require('sqlite3').verbose();

//Used for Jade template file, not used in project (issue Pi)
/*app.set('views', __dirname+'/app/views');
app.set('view engine', 'jade');
*/
//Set port for the application
app.listen(config.portHttp, config.ipAllowed);
module.exports = app;
console.log(process.env.NODE_ENV  + ' server running at http://localhost:' + config.portHttp);


/*
Import library serialport
doc : https://www.npmjs.com/package/serialport
*/
var serialPort = require("serialport");
var SerialPort = serialPort.SerialPort; 
var dateFormat = require('dateformat');
var Capteur = require('./app/models/capteur.js');
var userpreference = require('./app/models/userPreferences.js');

//listen on the port define 
//todo : get list of port and find the serial

var port = new SerialPort("/dev/ttyACM0",{
	  parser: serialPort.parsers.readline("\n")
});



port.on('open', function(){
  
  port.on('data', function(s){

  
       
       try {
       	console.log(s);
	    data = JSON.parse(s);
	    var c = Capteur.newObject(1,dateFormat(new Date(), "yyyy-mm-dd HH:MM"),null, data.T, data.H, data.A, data.L);
	    c.save();
	  } catch (e) {
		
		return console.error(e);
	  }
  });

infinite();
function infinite () {
	setTimeout(function() {
		userpreference.getalarm(function(row) {
			
			if(row.alarmTime != null){
				var now = Math.round(new Date().getTime() / 1000);
				console.log(now+ " - "+row.alarmTime);

				if(now == row.alarmTime){
					console.log("alarm");
					port.write("0");
				}
			}

		});
  		//
  		infinite();
  	}, 1000);
}

});

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});


