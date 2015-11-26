process.env.NODE_ENV = process.env.NODE_ENV || 'prod';
require('use-strict')

var config 		= require('./config/config');
var express     = require('./config/express');
var path 		= require('path');
var app         = express();

app.set('views', __dirname+'/app/views');
app.set('view engine', 'jade');

app.listen(config.portHttp, config.ipAllowed);
module.exports = app;
console.log(process.env.NODE_ENV  + ' server running at http://localhost:' + config.portHttp);



