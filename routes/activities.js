// jshint esversion:6

const express = require("express");
const router = express.Router();

// Require the db file so functions can be called from it
const db = require("../db");

// Pull in ensureAuthenticated to protect routes
const {
  ensureAuthenticated
} = require("../config/auth");

// ACTIVITIES ROUTES
router.get("/:id", (req, res) => { // set up ACTIVITIES get route, according to the selected destination's id
  db.selectDestination(req.params.id) // select the destination by its id
    .then(destinations => {
      if (destinations.userId === req.session.passport.user) { // check if logged in user owns this destination
        db.getActivities(req.params.id) // then get the activities associated with that destination
          .then(activities => {
            res.render("activities", { // then render the activities page with information from both destinations and activities tables
              destinations: destinations,
              activities: activities
            });
          });
      } else {
        res.redirect("/unauthorised");
      }
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message);
    });
});

router.post("/add/:id", (req, res) => {
  db.selectDestination(req.params.id) // select the destination by its id
    .then(destinations => {
      if (destinations.userId === req.session.passport.user) { // check if logged in user owns this destination
        db.addActivity(req.body, req.params.id) // add the activity, based on the form information and the destination id
          .then(activities => {
            res.redirect("/activities/" + req.params.id); // take them back to the activities page which will display all the activities
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

  db.getDestinationAndActivity(req.params.id) // Look up destination and activity by activity id, and join them
    .then(destinationAndActivity => {
      if (destinationAndActivity.userId === req.session.passport.user) {
        db.deleteActivity(req.params.id) // delete the activity based on id
          .then(activities => {
            res.redirect("/activities/" + destinationAndActivity.destinationId); // take them back to the activities page which will display all the activities
          })
          .catch(err => {
            res.status(500).send("DATABASE ERROR: " + err.message);
          });
      } else {
        res.redirect("/unauthorised");
      }
    });
});

router.get("/update/:id", (req, res) => {
  db.getDestinationAndActivity(req.params.id) // Look up destination and activity by activity id, and join them
    .then(destinationAndActivity => {
      if (destinationAndActivity.userId === req.session.passport.user) {
        db.updateActivity(req.params.id, req.body) // update the activity based on activity id and destination id
          .then(activities => {
            res.redirect("/activities/" + destinationAndActivity.destinationId); // take them back to the activities page which will display all the activities
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
