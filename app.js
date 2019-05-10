// jshint esversion: 6

// require the following packages
const express = require("express");
const hbs = require("express-handlebars");

// import the routes folder, and name it 'destinationRoutes' (saves it as a variable)
const destinationRoutes = require("./routes/routes");
const usersRoutes = require("./routes/users");

// save express() as a variable for ongoing use
const app = express();

// middleware setup for handlebars (copied from Leslie's project)
app.set('views', './views');
app.engine("hbs", hbs({defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

// set up for express
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// set up routes
app.use("/", destinationRoutes);
app.use("/users", usersRoutes);

// export 'app' for use elsewhere (particulalry index.js file)
module.exports = app;
