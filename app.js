const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Logic = require('logic-solver');
const translator = require('./translator');

const indexRouter = require('./routes/index');

const app = express();

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
app.post('/solve', (req, res) => {
  const solver = new Logic.Solver();
  const parsed = translator.parse(req.body);
  if (parsed == -1){
    res.send("error");
  }
  const translated = translator.translate(parsed);
  translated.forEach(x => {
    solver.require(x);
  })
 
  const allSolutions = [];
  let curSolution = null;
  while ((curSolution = solver.solve())) {
    allSolutions.push([curSolution.getTrueVars().length, curSolution.getMap()]);
    solver.forbid(curSolution.getFormula());
  }
  //Get the solution with most people invited
  const maxSol = allSolutions.sort((a, b) => a[0] < b[0] ? -1 : (a[0] > b[0] ? 1 : 0)).reverse()[0][1];
  
  if(allSolutions.length == 0){
    res.send("error");
  }
  else{
    res.send(JSON.stringify(maxSol));
  }
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
