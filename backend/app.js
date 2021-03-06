var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var cors = require('cors')

//
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/products');
var blogRouter = require('./routes/blog');
var homeRouter = require('./routes/home');
//
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var verificationRouter = require('./routes/verification');
var create_questionRouter = require('./routes/create_question');
var questionRouter = require('./routes/question');
var question_moreRouter = require('./routes/question_more');
var following_questionRouter = require('./routes/following_question');
var create_courseRouter = require('./routes/create_course');
var edit_courseRouter = require('./routes/edit_course');
var student_courseRouter = require('./routes/student_course');
var tutor_courseRouter = require('./routes/tutor_course');

var app = express();

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Methods','POST, GET, PUT, PATCH, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers','Content-Type, Option, Authorization')
  next()
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products',productRouter);
app.use('/home', homeRouter);
app.use('/blog', blogRouter);
//
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/verification', verificationRouter);
app.use('/create_question',create_questionRouter);
app.use('/question',questionRouter);
app.use('/question_more',question_moreRouter);
app.use('/following_question',following_questionRouter);
app.use('/create_course',create_courseRouter);
app.use('/edit_course',edit_courseRouter);
app.use('/student_course',student_courseRouter);
app.use('/tutor_course',tutor_courseRouter);

/*var corsOptions = {
  origin: "http://localhost:4000"
};*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Methods','POST, GET, PUT, PATCH, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers','Content-Type, Option, Authorization')
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
