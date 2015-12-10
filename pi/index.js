process.env.NODE_ENV = process.env.NODE_ENV || 'prod';
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

//listen on the port define 
// get list of port a
serialPort.list(function(err, ports) {
	ports.forEach(function(port) {
	})
})

try{
	var port = new SerialPort("/dev/ttyACM0",{
		 parser: serialPort.parsers.readline("\n")
	}, false);

	port.on('error',function(err) {
		console.log(err);
	});

	port.on('open', function(){
	  
		port.on('data', function(data){
		   console.log("data serial : "+data);
		});

		infinite();
		function infinite () {
			setTimeout(function() {
		  		port.write("0");
		  		infinite();
		  	}, 5000);
		}


	});

}catch(e){
	console.log(e);
}


