// jshint esversion:6

const express = require("express");
const router = express.Router();

// Require the db file so functions can be called from it
const db = require("../db");

// Pull in ensureAuthenticated to protect routes
const {ensureAuthenticated} = require("../config/auth");



// ACTIVITIES ROUTES
router.get("/:id", (req, res) => { // set up ACTIVITIES get route, according to the selected destination's id
  db.selectDestination(req.params.id) // select the destination by its id
    .then(destinations => {
      db.getActivities(req.params.id) // then get the activities associated with that destination
        .then(activities => {
          res.render("activities", { // then render the activities page with information from both destinations and activities tables
            destinations: destinations,
            activities: activities
          });
        });
    });
});

router.post("/add/:id", (req, res) => {
  db.addActivity(req.body, req.params.id) // add the activity, based on the form information and the destination id
  .then(activities => {
    res.redirect("/activities/" + req.params.id); // take them back to the activities page which will display all the activities
  })
  .catch(err => {
    res.status(500).send("DATABASE ERROR: " + err.message);
  });
});

router.post("/delete/:id/:destinationId", (req, res) => {
  db.deleteActivity(req.params.id) // delete the activity based on id
    .then(destinations => {
      res.redirect("/activities/" + req.params.destinationId); // take them back to the activities page which will display all the activities
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message);
    });
});

router.post("/update/:id/:destinationId", (req, res) => {
  db.updateActivity(req.params.id, req.body) // update the activity based on activity id and destination id
  .then(activities => {
    res.redirect("/activities/" + req.params.destinationId); // take them back to the activities page which will display all the activities
  })
  .catch(err => {
    res.status(500).send("DATABASE ERROR: " + err.message);
  });
});





module.exports = router;