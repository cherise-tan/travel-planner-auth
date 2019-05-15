// jshint esversion: 6

// use the express package
const express = require("express");

// require the db file so functions can be called from it
const db = require("../db");

// set up express router
const router = express.Router();

router.get("/", (req, res) => {
  if (req.user){ // redirect user to their destinations page if they are logged in
    res.redirect("/destinations");
  } else {
      res.render("welcome", {layout: "home.hbs"});
  }
});

router.get("/unauthorised", (req, res) => {
  res.render("unauthorised");
});

// export the router so we can use it elsewhere if needed (i.e. within the express module)
module.exports = router;
