// jshint esversion:6

const express = require("express");
const router = express.Router();

// Require the db file so functions can be called from it
const db = require("../db");

// Pull in ensureAuthenticated to protect routes
const {ensureAuthenticated} = require("../config/auth");



// DESTINATIONS ROUTES
router.get("/", ensureAuthenticated, (req, res) => {
  db.getDestinations()
    .then(destinations => {
      res.render("home", {
        destinations: destinations
      });
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message);
    });
});

router.get("/add", (req, res) => { // set up add route
  res.render("destinations");
});

router.post("/add", (req, res) => {
  db.addDestinations(req.body) // add new destination to the database
    .then(destinations => {
      res.redirect("/destinations"); // take them back to the homepage which will display all the information
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message);
    });
});

router.post("/delete/:id", (req, res) => { // set up delete route
  db.deleteDestination(req.params.id) // delete destination according to id
    .then(destinations => {
      res.redirect("/destinations"); // take them back to the homepage which will display all the information
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message);
    });
});

router.get("/update/:id/", (req, res) => { // set up update route
  db.selectDestination(req.params.id) // select the destination by id
    .then(destinations => {
      res.render("destinations", { // then render the destinations file with data from the selected destination
        destinations: destinations
      });
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message);
    });
});

router.post("/update/:id", (req, res) => {
  db.updateDestination(req.params.id, req.body) // update the destination by its id, passing in the information from the form
    .then(destinations => {
      res.redirect("/destinations"); // take them back to the homepage which will display all the information
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message);
    });
});






module.exports = router;
