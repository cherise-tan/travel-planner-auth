// jshint esversion: 6

// we require the following packages
const express = require("express");
const hbs = require("express-handlebars");

const destinationRoutes = require("./routes/routes"); //import the routes folder, and name it 'destinationRoutes' (saves it as a variable)

const server = express();

// middleware setup for handlebars (copied from Leslie's project)
server.set('views', './views');

server.engine("hbs", hbs({defaultLayout: "main", extname: ".hbs" }));
server.set("view engine", "hbs");

server.use(express.urlencoded({ extended: true }));

// set up routes
server.use("/", destinationRoutes);

// export 'server'
module.exports = server;
