var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var graphqlHTTP = require('express-graphql')

var mongoose = require('mongoose')
var cors = require('cors')
var app = express();

const schema = require('./schema/schema')
// view engine setup
mongoose.connect('mongodb://admin:admin123@ds047345.mlab.com:47345/homeaway').then(result =>{
  console.log("Connected")
})
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/graphql',graphqlHTTP({
  schema:schema,
  graphiql : true
}))


module.exports = app;
