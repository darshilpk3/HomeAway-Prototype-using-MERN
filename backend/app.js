var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var mysql = require('mysql');
var fileUpload = require('express-fileupload')
var indexRouter = require('./routes/index');
var propertyRouter = require('./routes/property');
var travelRouter = require('./routes/travel');
var ownerRouter = require('./routes/owner');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + '/public'));
app.use(fileUpload())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(session({
  secret              : 'cmpe273_kafka_passport_mongo',
  httponly            : false,
  resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
  duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration      :  5 * 60 * 1000
}));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/', indexRouter);
app.use('/property', propertyRouter);
app.use('/travel', travelRouter);
app.use('/owner', ownerRouter);



module.exports = app;
