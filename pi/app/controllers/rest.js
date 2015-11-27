var path        = require('path');
var formidable = require('formidable'),
    fs   = require('fs');


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

exports.postICS = function(req, res) {
	var form = new formidable.IncomingForm();
	form.uploadDir = "/home/pi/web/alarmbox/app/files";
	form.keepExtensions = true;

	form.parse(req, function(err, fields, files) {
      /*  res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));*/
    });

    form.on('progress', function(bytesReceived, bytesExpected) {
        var percent_complete = (bytesReceived / bytesExpected) * 100;
        console.log(percent_complete);
    });

     form.on('end', function(fields, files){
        var temp_path = this.openedFiles[0].path;
        console.log(temp_path);
        /*
        fs.writeFile('/tmp/fs.tmp', '', function(err) {
		  if (err) throw err;
		});*/

    });

};