// jshint esversion: 6

// we require the following packages
const express = require("express");
const hbs = require("express-handlebars");

const server = express();

// middleware setup for handlebars (copied from Leslie's project)
server.engine("hbs", hbs({ extname: "hbs" }));
server.set("view engine", "hbs");
server.use(express.urlencoded({ extended: true }));

// set up routes
server.get("/", (req, res) => res.send("Hello world"));

// export 'server'
module.exports = server;
