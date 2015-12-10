var path        = require('path');
var formidable = require('formidable'),
    fs   = require('fs');
var boxes = require('../models/boxes.js');
var up = require('../models/userPreferences.js');

// HTTP - GET
exports.loginPost = function(req, res) {
		boxes.login(req.body.identifiant, function(isLogged) {
			if(isLogged){
				//res.cookie('identifiant', req.body.identifiant);
				res.set({identifiant : req.body.identifiant});
				res.sendStatus(200);
			}
			else
				res.sendStatus(202);
		});	
}

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

exports.postICS = function(req, res) {
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

};