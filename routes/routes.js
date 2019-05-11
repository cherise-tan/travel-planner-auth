// jshint esversion: 6

// use the express package
const express = require("express");

// require the db file so functions can be called from it
const db = require("../db");

// set up express router
const router = express.Router();

router.get("/", (req, res) => {
  res.render("welcome");
});

// export the router so we can use it elsewhere if needed (i.e. within the express module)
module.exports = router;
