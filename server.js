var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser  = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');


//var connectionString = 'mongodb://127.0.0.1:27017/WebDev';
//
//// use remote connection string
//// if running in remote server
//if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
//    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
//        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
//        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
//        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
//        process.env.OPENSHIFT_APP_NAME;
//}
//
//// connect to the database
//var db = mongoose.connect(connectionString);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer());

var uuid= require('node-uuid');

app.use(express.static(__dirname + '/Public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.get('/hello', function(req, res){
    res.send('hello world');
});
//require("./Public/assignment/server/app.js")(app, db, mongoose);
require("./Public/project/server/app.js")(app, uuid);

app.listen(port, ipaddress);
