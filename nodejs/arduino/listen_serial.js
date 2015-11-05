/*
Import library serialport
doc : https://www.npmjs.com/package/serialport
*/
var serialPort = require("serialport");
var SerialPort = serialPort.SerialPort; 

//listen on the port define 
//todo : get list of port and find the serial
var port = new SerialPort("/dev/ttyACM1",{
	  parser: serialPort.parsers.readline("\n")
});


port.on('open', function(){
  
  port.on('data', function(data){
       console.log(data);
  });

});