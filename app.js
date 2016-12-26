var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./routes');
var cookieParser = require('cookie-parser');
var app = express();
var session = require('express-session');

// DATABASE SETUP
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/freetsdb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("database connected");
});

app.use(session({ secret : '6170', resave : true, saveUninitialized : true }));
//Serving static files
app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      'message': err.message,
      'error': err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    'error': err.message
  });
});

module.exports = app;