var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Logic = require('logic-solver');
var translator = require('./translator');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


//Do the actual solving here
app.post('/solve', function(req, res){
  var solver = new Logic.Solver();
  var parsed = translator.parse(req.body);
  if (parsed == -1){
    res.send("error");
  }
  var translated = translator.translate(parsed);
  translated.forEach(x => {
    solver.require(x);
  })
  var sol1 = solver.solve();
  sol1.getTrueVars();
  res.send(JSON.stringify(sol1.getMap()));
});


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
