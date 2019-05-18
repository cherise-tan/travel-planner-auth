// jshint esversion:6

const express = require("express");
const router = express.Router();

// Require the db file so functions can be called from it
const db = require("../db/accommodation");
const destinationdb = require("../db/destinations");

// Pull in ensureAuthenticated to protect routes
const {
  ensureAuthenticated
} = require("../config/auth");

// ACCOMMODATIONS ROUTES
router.get("/:id", (req, res) => { // set up accommodations get route, according to the selected destination's id
  destinationdb.selectDestination(req.params.id) // select the destination by its id
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
  destinationdb.selectDestination(req.params.id) // select the destination by its id
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

router.post("/delete/:id", (req, res) => {
  db.getDestinationAndAccommodation(req.params.id) // Look up destination and activity by activity id, and join them
    .then(destinationAndAccommodation => {
      if (destinationAndAccommodation.userId === req.session.passport.user) {
          db.deleteAccommodation(req.params.id) // delete the accommodation based on id
            .then(accommodations => {
              res.redirect("/accommodation/" + destinationAndAccommodation.destinationId); // take them back to the accommodation page which will display all the accommodations
            })
            .catch(err => {
              res.status(500).send("DATABASE ERROR: " + err.message);
            });

      } else {
        res.redirect("/unauthorised");
      }
    });
});

router.post("/update/:id", (req, res) => {
  db.getDestinationAndAccommodation(req.params.id) // Look up destination and activity by activity id, and join them
    .then(destinationAndAccommodation => {
      if (destinationAndAccommodation.userId === req.session.passport.user) {
        db.updateAccommodation(req.params.id, req.body) // update the activity based on activity id and destination id
          .then(accommodations => {
            res.redirect("/accommodation/" + destinationAndAccommodation.destinationId); // take them back to the activities page which will display all the activities
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
