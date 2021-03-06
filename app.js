var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/v1/auth/register');
var loginRouter = require('./routes/v1/auth/login');
var loggedInRouter = require('./routes/v1/auth/loggedIn');
var logoutRouter = require('./routes/v1/auth/logout');
var userInfoRouter = require('./routes/v1/user/info');

var app = express();

var db = require("./mongodb/connection");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//cross origin headers
// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader(
    "Access-Control-Allow-Origin",
    "development" === "development" ? "http://localhost:4000" : "https://yoloapp-client.herokuapp.com"
  );

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTION, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// Check JWT
app.use(function (req, res, next) {
  console.log('req.cookies', req.cookies);

  // Pass to next layer of middleware
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/v1/auth/register', registerRouter);
app.use('/v1/auth/login', loginRouter);
app.use('/v1/auth/loggedIn', loggedInRouter);
app.use('/v1/auth/logout', logoutRouter);
app.use('/v1/user/info', userInfoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
