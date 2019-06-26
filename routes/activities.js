const express = require("express");
const router = express.Router();

// Require the db file so functions can be called from it
const db = require("../db/activities");
const destinationdb = require("../db/destinations");

router.get("/:id", (req, res) => { // Set up ACTIVITIES get route, according to the selected destination's id
  destinationdb.selectDestination(req.params.id) // Select the destination by its id
    .then(destinations => {
      if (destinations.userId === req.session.passport.user) { // Check if logged in user owns this destination
        db.getActivities(req.params.id) // Then get the activities associated with that destination
          .then(activities => {
            res.render("activities", { // Then render the activities page with information from both destinations and activities tables
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
  destinationdb.selectDestination(req.params.id)
    .then(destinations => {
      if (destinations.userId === req.session.passport.user) {
        db.addActivity(req.body, req.params.id)
          .then(() => {
            res.redirect("/activities/" + req.params.id);
          })
      } else {
        res.redirect("/unauthorised");
      }
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message);
    });
});

router.post("/delete/:id", (req, res) => {
  db.getDestinationAndActivity(req.params.id) // Look up destination and activity by activity id, and join these tables
    .then(destinationAndActivity => {
      if (destinationAndActivity.userId === req.session.passport.user) {
        db.deleteActivity(req.params.id) // Delete the activity based on id
          .then(() => {
            res.redirect("/activities/" + destinationAndActivity.destinationId); // Take them back to the activities page
          })
      } else {
        res.redirect("/unauthorised");
      }
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message);
    });
});

router.post("/update/:id", (req, res) => {
  db.getDestinationAndActivity(req.params.id)
    .then(destinationAndActivity => {
      if (destinationAndActivity.userId === req.session.passport.user) {
        db.updateActivity(req.params.id, req.body)
          .then(() => {
            res.redirect("/activities/" + destinationAndActivity.destinationId);
          })
      } else {
        res.redirect("/unauthorised");
      }
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message);
    });
});

module.exports = router;