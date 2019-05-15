// jshint esversion:6

const express = require("express");
const router = express.Router();

// Require the db file so functions can be called from it
const db = require("../db");

// Pull in ensureAuthenticated to protect routes
const {
  ensureAuthenticated
} = require("../config/auth");

// ACCOMMODATIONS ROUTES
router.get("/:id", (req, res) => { // set up accommodations get route, according to the selected destination's id
  db.selectDestination(req.params.id) // select the destination by its id
    .then(destinations => {
      if (destinations.userId === req.session.passport.user) { // check if logged in user owns this destination
        db.getAccommodations(req.params.id) // then get the accommodation associated with that destination
          .then(accommodations => {
            res.render("accommodation", { // then render the activities page with information from both destinations and activities tables
              destinations: destinations,
              accommodations: accommodations
            });
          });
      } else {
        res.redirect("/unauthorised");
      }
    });
});

router.post("/add/:id", (req, res) => {
  db.selectDestination(req.params.id) // select the destination by its id
    .then(destinations => {
      if (destinations.userId === req.session.passport.user) { // check if logged in user owns this destination
        db.addAccommodation(req.body, req.params.id) // add the accommodation, based on the form information and the destination id
          .then(accommodations => {
            res.redirect("/accommodation/" + req.params.id); // take them back to the accommodation page which will display all the accommodations
          })
          .catch(err => {
            res.status(500).send("DATABASE ERROR: " + err.message);
          });
      } else {
        res.redirect("/unauthorised");
      }
    });
});

router.post("/delete/:id/:destinationId", (req, res) => {
  db.selectDestination(req.params.destinationId) // select the destination by its id
    .then(destinations => {
      if (destinations.userId === req.session.passport.user) { // check if logged in user owns this destination
        db.deleteAccommodation(req.params.id) // delete the accommodation based on id
          .then(accommodations => {
            res.redirect("/accommodation/" + req.params.destinationId); // take them back to the accommodation page which will display all the accommodations
          })
          .catch(err => {
            res.status(500).send("DATABASE ERROR: " + err.message);
          });
      } else {
        res.redirect("/unauthorised");
      }
    });
});

router.post("/update/:id/:destinationId", (req, res) => {
  db.selectDestination(req.params.destinationId) // select the destination by its id
    .then(destinations => {
      if (destinations.userId === req.session.passport.user) { // check if logged in user owns this destination
        db.updateAccommodation(req.params.id, req.body) // update the activity based on activity id and destination id
          .then(accommodations => {
            res.redirect("/accommodation/" + req.params.destinationId); // take them back to the accommodation page which will display all the accommodations
          })
          .catch(err => {
            res.status(500).send("DATABASE ERROR: " + err.message);
          });
      } else {
        res.redirect("/unauthorised");
      }
    });
});


module.exports = router;
