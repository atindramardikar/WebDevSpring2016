var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');



var connectionString = 'mongodb://127.0.0.1:27017/WebDev';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
// connect to the database
mongoose.connect(connectionString, {useMongoClient : true});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer());
app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

var uuid= require('node-uuid');

app.use(express.static(__dirname + '/Public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.PORT || 80;
app.get('/hello', function(req, res){
    res.send('hello world');
});
app.get('/env', function(req, res){
    res.json(process.env);
});

require("./Public/assignment/server/app.js")(app, null, mongoose);
require("./Public/project/server/app.js")(app,  null, mongoose, uuid);

app.listen(port, function(){
    console.log('listening to..',port);
});
