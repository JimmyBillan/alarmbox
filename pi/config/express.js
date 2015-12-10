var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
	morgan      = require('morgan');
var session     = require('express-session');
    var path = require('path');
    var cookieParser = require('cookie-parser')


module.exports = function() {
    var app = express();

    app.use(bodyParser.urlencoded({
        extended: true
    }));


    app.use(bodyParser.json());
    app.use(cookieParser());

    app.use(morgan('dev'));

    app.use('/static', express.static(path.join(__dirname,'../app/views/public/')));
/*
    app.use(session({
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: true,
      cookie: { httpOnly: false, secure : false}
    })); */

	require('../app/routes/front.js')(app);
    require('../app/routes/rest.js')(app);
    return app;
};