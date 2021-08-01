//Importing Express
const express = require("express");
const app = express();

//Importing database
const mongoConnect = require('./utils/database').mongoConnect;

//Importing Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

//Importing Path
const path = require("path");

//Setting View Engine(Pug)
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "Views"));

//Connecting Staticl Files
app.use(express.static(path.join(__dirname, "public")));

const clientRouter = require('./routes/client-router')
app.use(clientRouter)

const adminRoutes = require('./routes/admin-routes');
app.use('/admin', adminRoutes)

//listening to the server
mongoConnect(() => {
    app.listen(3000)
})