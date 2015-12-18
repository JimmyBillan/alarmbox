
var http = require('http')
var formidable = require('formidable'),
    fs   = require('fs');
var boxes = require('../models/boxes.js');
var up = require('../models/userPreferences.js');

var dateFormat = require('dateformat');
var Capteur = require('../models/capteur.js');

var urlParser = require('url');
// HTTP - GET
exports.loginPost = function(req, res) {
	boxes.login(req.body.identifiant, function(isLogged) {
		if(isLogged){
			//res.cookie('identifiant', req.body.identifiant);
			res.set({identifiant : req.body.identifiant});
			res.sendStatus(200);
		}
		else{
			console.log(isLogged);
			res.sendStatus(202);
		}
			
	});	
}


//http - get 
//datetime('now','-1 day')
exports.getChars = function(req, res) {
	if(req.params.id && req.params.date){
		Capteur.dbselect(["*"],' WHERE "timestamp" > datetime("now","-8 hour")', function(rows) {
			//console.log(rows);
			res.json(rows);
		});
	}else{
		res.sendStatus(400); 
	}
	
};

exports.alarmCancel = function(req, res) {

	up.alarmCancel(function(r) {
			if(r){
				res.sendStatus(500);
				console.log(r);
			}else{

			res.sendStatus(200);
			}
		});
};

exports.alarmEnable = function(req, res) {

	up.alarmEnable(req.body.mdate, function(r) {
			if(r){
				res.sendStatus(500);
				console.log(r);
			}else{

				res.sendStatus(200);
			}
		});
};

exports.posttimeBeforeFirstEvent = function(req, res) {
	if(req.body.timeBeforeFirstEvent != undefined){
		var mUp = up.newObject(null,null,req.body.timeBeforeFirstEvent,null);
		
		mUp.updatetimeBeforeFirstEvent(function(err) {
			if(err){
				console.log(err);
				res.sendStatus(500);
			}else{
				res.sendStatus(200);
			}
		});
	}else{
		res.sendStatus(400);
	}
};

exports.posttimeForPerfect = function(req, res) {
	res.send(req.body);
};

exports.actionCapteurs = function(req, res) {
	if(req.params.actionCapteurs == "startRecording"){
		
		var serialPort = require("serialport");
		var SerialPort = serialPort.SerialPort; 


		var port = new SerialPort("/dev/ttyACM0",{
			  parser: serialPort.parsers.readline("\n")
		});



		port.on('open', function(){
		  
		  port.write("1");
		  port.close();

		});


		res.sendStatus(200);
	}else if(req.params.actionCapteurs == "stopRecording"){
		var serialPort = require("serialport");
		var SerialPort = serialPort.SerialPort; 


		var port = new SerialPort("/dev/ttyACM0",{
			  parser: serialPort.parsers.readline("\n")
		});



		port.on('open', function(){
		  
		  port.write("2");
		  port.close();

		});


		res.sendStatus(200);
	}else{
		res.sendStatus(500);
	}
};



exports.postICS = function(req, res) {
	var path = require('path');
	
	if(req.params.type != undefined){

		var options = {
			host : urlParser.parse(req.body.url).hostname,
			path : urlParser.parse(req.body.url).pathname,
			method: 'GET',
		};

		var reqF = http.request(options, function(resF) {
			var data = "";
			resF.setEncoding('utf8');
			resF.on('data', function(d){
				 return data += d;
			})
			resF.on('end', function(d){
				fs.writeFile(path.join(__dirname,'../files/upload/calendar.ics'), data, function(err) {
				    if(err) {
				        console.log(err);
				        res.sendStatus(500);
				    }

				    console.log("The file was saved!");
				}); 

				res.sendStatus(200);
			})
		});

		reqF.end();

	}else{
		var form = new formidable.IncomingForm();
		form.uploadDir = "/home/user/Documents/vmpi/alarmbox/app/files";
		form.keepExtensions = true;

		form.parse(req, function(err, fields, files) {
	      /*  res.writeHead(200, {'content-type': 'text/plain'});
	        res.write('received upload:\n\n');
	        res.end(util.inspect({fields: fields, files: files}));*/
	    });

	    form.on('progress', function(bytesReceived, bytesExpected) {
	        var percent_complete = (bytesReceived / bytesExpected) * 100;
	    });

	     form.on('end', function(fields, files){
	        var temp_path = this.openedFiles[0].path;		
	        
	        fs.writeFile( path.join(__dirname,'../files/upload/calendar.ics'),  fs.readFileSync(temp_path), function(err) {
			  if (err) throw err;
			  else

			  	up.updategotCalendar(1, function(err) {
					if(!err){
						res.sendStatus(200);
					}else{
						res.sendStatus(500);
					}
				})
			});

	    });
	}

	

};