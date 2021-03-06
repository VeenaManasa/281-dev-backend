/**
 * Created by avinash on 4/29/17.
 */

var http = require('http');
var express = require('express');
var routes = require('./app/routes');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

routes.registerRoutes(app);

var server = http.createServer(app);



server.listen(9923);

module.exports = server;


