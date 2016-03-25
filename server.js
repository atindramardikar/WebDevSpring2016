var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
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
require("./public/assignment/server/app.js")(app,uuid);
require("./public/project/server/app.js")(app,uuid);
app.listen(port, ipaddress);
