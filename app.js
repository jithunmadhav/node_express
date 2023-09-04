var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var session = require('express-session');
var db=require('./config/connection')
var indexRouter = require('./routes/user');
var adminRouter = require('./routes/admin');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const oneDay=1000*60*60*24;
app.use(session({
  secret:'thisismysecrctekeyfhrgfgrfrty84fwir767',
  resave:false,
  cookie:{maxAge:oneDay},
  saveUninitialized:true
}));

db.connect((err)=>{
  if(err) console.log("connection error");
  else console.log("Database connected on port http://localhost:8000/");
})

app.use(function cache1(req, res, next) { 
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
   next();
 });





app.use('/', indexRouter);
app.use('/', adminRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
