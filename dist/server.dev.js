"use strict";

//Importing Express
var express = require("express");

var app = express(); //Importing database

var mongoConnect = require('./utils/database').mongoConnect; //Importing Body Parser


var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
  extended: false
})); //Importing Path

var path = require("path"); //Setting View Engine(Pug)


app.set("view engine", "pug");
app.set("views", path.join(__dirname, "Views")); //Connecting Staticl Files

app.use(express["static"](path.join(__dirname, "public")));

var clientRouter = require('./routes/client-router');

app.use(clientRouter);

var adminRoutes = require('./routes/admin-routes');

app.use('/admin', adminRoutes); //listening to the server

mongoConnect(function () {
  app.listen(3000);
});