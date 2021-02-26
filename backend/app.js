var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/products');
var blogRouter = require('./routes/blog');
var registerRouter = require('./routes/register');
var homeRouter = require('./routes/home');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Methods','POST, GET, PUT, PATCH, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers','Content-Type, Option, Authorization')
  next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products',productRouter);
app.use('/blog', blogRouter);
app.use('/register', registerRouter);
app.use('/home', homeRouter);
app.use('/login', loginRouter);

/*var corsOptions = {
  origin: "http://localhost:4000"
};*/
app.use(cors());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.post('/', function(req, res, next) {
  res.send('respond with a resource from app');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
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
