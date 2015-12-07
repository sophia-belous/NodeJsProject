var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var expressSession = require('express-session');
var crypto = require('crypto');
var flash = require('connect-flash');
var multer = require('multer');
var fs = require('fs');

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

app.use(expressSession({secret: 'mySecretKey', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function(req, file, cb) {
        crypto.pseudoRandomBytes(5, function (err, raw) {
            if (err) return cb(err);

        cb(null, raw.toString('hex') + path.extname(file.originalname));
        });
    }
});
app.use(multer({    
    storage: storage
}).array('file'));

app.use(flash());

initPassport(passport);

require('./app/routes')(app, passport);


app.listen(port);	
console.log('Magic happens on port ' + port);
exports = module.exports = app;