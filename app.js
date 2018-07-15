var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var cors = require('cors');
var flash = require('connect-flash');

var app = express();

require('./server/passport')(passport);
var dbConfig = require('./server/db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var routes = require('./routes/index')(passport);
var apiRoutes = require('./routes/api')(app, passport);
var users = require('./routes/users');

mongoose.connect(dbConfig.url);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use('/users', users);
app.use(expressSession({secret: 'f4Uy0XvKsmIx'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/api', apiRoutes);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('The page you were looking for was not found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
    });
});


module.exports = app;
