// jshint esversion: 6

// require the following packages
const express = require("express");
const hbs = require("express-handlebars");

// import the routes folder, and name it 'destinationRoutes' (saves it as a variable)
const destinationRoutes = require("./routes/routes");

// save express() as a variable for ongoing use
const server = express();

// middleware setup for handlebars (copied from Leslie's project)
server.set('views', './views');
server.engine("hbs", hbs({defaultLayout: "main", extname: ".hbs" }));
server.set("view engine", "hbs");

// set up for express
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));

// set up routes
server.use("/", destinationRoutes);

// export 'server' for use elsewhere (particulalry index.js file)
module.exports = server;
