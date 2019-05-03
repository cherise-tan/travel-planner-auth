// jshint esversion: 6

// use the express package
const express = require("express");

// require the db file so functions can be called from it
const db = require("../db");

// set up express router
const router = express.Router();

// set up home route
router.get("/", (req, res) => {
  db.getDestinations()
    .then(destinations => {
      res.render("index", { destinations: destinations });
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message); // something broke!
    });

});



// export the router so we can use it elsewhere if needed (i.e. within the express module)
module.exports = router;
