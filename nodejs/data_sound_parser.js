var fs = require('fs');
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

function Record(arrayRaw) {
	this.level = arrayRaw[0];
	this.date = arrayRaw[1];
}

function Records() {
	this.collection = [];
}

var records = new Records();

fs.readFile('TraceFile.txt', function (err, data) {
  if (err) throw err;
  
  var arrayRecord = decoder.write(data).split("/");
  for (var i = 0; i < arrayRecord.length; i++) {
   	records.collection.push(new Record(arrayRecord[i].split(":")));
   };

   console.log(records);
});