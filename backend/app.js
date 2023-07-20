const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// ROUTES
const newsRouter = require('./routes/news');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const profileRouter = require('./routes/profile');
const commentsRouter = require('./routes/comments');

// APP
const app = express();

// DATABASE
//const database = require('./helper/database')();
const testDatabase = require('./helper/test-database')();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Config
const config = require('./config');
app.set('api_secret_key', config.api_secret_key);

// MIDDLEWARE
const verifyToken = require('./middleware/verify-token');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// PATH ROUTES
app.use('/', indexRouter);
app.use('/api', verifyToken);
app.use('/api/news', newsRouter);
app.use('/api/users', usersRouter);
app.use('/api/profile', profileRouter);
app.use('/api/comments', commentsRouter);

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
  res.render({ error: { message: err.message, code: err.code }});
});

module.exports = app;
