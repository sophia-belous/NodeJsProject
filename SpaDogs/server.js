var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var expressSesssion = require('express-session');
var flash = require('connect-flash');

var app = express();
var db = require('./config/db');
var initPassport = require('./app/passport/init');

var port = process.env.PORT || 8080;
mongoose.connect(db.url);

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

app.use(expressSesssion({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

initPassport(passport);

require('./app/routes')(app, passport);

app.listen(port);	
console.log('Magic happens on port ' + port);
exports = module.exports = app;