/*
Parser de fichier ics
*/

function Events(){
	this.listEvent = [];
}

function Event(){
	this.DTSTART = null;
	this.DTEND = null;
	this.UID = null;
	this.SUMMARY = null;
	this.LOCATION = null;
	this.DESCRIPTION = null;
	this.CATEGORIES = null;

	this.calenDate = function(icalStr, cb) {
		var strYear = icalStr.substr(0,4);
	    var strMonth = parseInt(icalStr.substr(4,2),10) - 1;
	    var strDay = icalStr.substr(6,2);
	    var strHour = icalStr.substr(9,2);
	    var strMin = icalStr.substr(11,2);
	    var strSec = icalStr.substr(13,2);
		cb(new Date(strYear,strMonth, strDay, strHour, strMin, strSec));
	};	

	this.setDTSTART = function(line) {
		var self = this;
		var l = line.length;

		this.calenDate(line.substr(l-16, l-1),function(d) {
			var nD = new Date();
			var today = nD.getFullYear()+":"+ nD.getMonth()+":"+nD.getDate();
			var lD = d.getFullYear()+":"+d.getMonth()+":"+d.getDate();
			self.DTSTART =  d;
		}); 
	}

	this.setDTEND = function(line) {
		var self = this;
		var l = line.length;

		this.calenDate(line.substr(l-16, l-1),function(d) {
			var nD = new Date();
			var today = nD.getFullYear()+":"+ nD.getMonth()+":"+nD.getDate();
			var lD = d.getFullYear()+":"+d.getMonth()+":"+d.getDate();
			
			self.DTEND = d;		
		}); 
	}
	this.setUID = function(line) {
		this.UID = line.substr(4 , line.length- 1);
	};

	this.setSUMMARY = function(line) {
		this.SUMMARY = line.substr(8, line.length - 1);
	};

	this.setLOCATION = function(line) {
		this.LOCATION = line.substr(9, line.length - 1);
	};
}

var rl = require('readline').createInterface({
  input: require('fs').createReadStream('master2.ics')
});

var e = new Event();
var es = new Events();

rl.on('line', function (line) {

	if(line.substr(0,12) === "BEGIN:VEVENT"){
		e = new Event();
	}else
 	if(line.substr(0,7) === "DTSTART"){
 		e.setDTSTART(line);
 	}else
 	if(line.substr(0,5) === "DTEND"){
 		e.setDTEND(line);
 	}else
 	if(line.substr(0,3) === "UID"){
 		e.setUID(line);
 	}else
 	if(line.substr(0,7) === "SUMMARY"){
 		e.setSUMMARY(line);
 	}else
 	if(line.substr(0,8) === "LOCATION"){
 		e.setLOCATION(line);
 	}else
 	if(line.substr(0,10) === "CATEGORIES"){
 		//e.setCATEGORIES(line);
 	}
 	if(line.substr(0, 10) === "END:VEVENT"){
 		es.listEvent.push(e);
 	}
});

rl.on('close',function() {
	console.log(es);
})
