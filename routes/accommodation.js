// jshint esversion:6

const express = require("express");
const router = express.Router();

// Require the db file so functions can be called from it
const db = require("../db");

// Pull in ensureAuthenticated to protect routes
const {ensureAuthenticated} = require("../config/auth");

// ACCOMMODATIONS ROUTES
router.get("/:id", (req, res) => { // set up accommodations get route, according to the selected destination's id
  db.selectDestination(req.params.id) // select the destination by its id
    .then(destinations => {
      db.getAccommodations(req.params.id) // then get the accommodation associated with that destination
        .then(accommodations => {
          res.render("accommodation", { // then render the activities page with information from both destinations and activities tables
            destinations: destinations,
            accommodations: accommodations
          });
        });
    });
});

router.post("/add/:id", (req, res) => {
  db.addAccommodation(req.body, req.params.id) // add the accommodation, based on the form information and the destination id
  .then(accommodations => {
    res.redirect("/accommodation/" + req.params.id); // take them back to the accommodation page which will display all the accommodations
  })
  .catch(err => {
    res.status(500).send("DATABASE ERROR: " + err.message);
  });
});

router.post("/delete/:id/:destinationId", (req, res) => {
  db.deleteAccommodation(req.params.id) // delete the accommodation based on id
    .then(accommodations => {
      res.redirect("/accommodation/" + req.params.destinationId); // take them back to the accommodation page which will display all the accommodations
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message);
    });
});

router.post("/update/:id/:destinationId", (req, res) => {
  db.updateAccommodation(req.params.id, req.body) // update the activity based on activity id and destination id
  .then(accommodations => {
    res.redirect("/accommodation/" + req.params.destinationId); // take them back to the accommodation page which will display all the accommodations
  })
  .catch(err => {
    res.status(500).send("DATABASE ERROR: " + err.message);
  });
});


module.exports = router;
