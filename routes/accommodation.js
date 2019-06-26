const express = require("express");
const router = express.Router();

// Require the db file so functions can be called from it
const db = require("../db/accommodation");
const destinationdb = require("../db/destinations");

router.get("/:id", (req, res) => { // Set up accommodations get route, according to the selected destination's id
  destinationdb.selectDestination(req.params.id) // Select the destination by its id
    .then(destinations => {
      if (destinations.userId === req.session.passport.user) { // Check if logged in user owns this destination
        db.getAccommodations(req.params.id) // Then get the accommodation associated with that destination
          .then(accommodations => {
            res.render("accommodation", { // Then render the accommodation page with information from both destinations and accommodation tables
              destinations: destinations,
              accommodations: accommodations
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
        db.addAccommodation(req.body, req.params.id)
          .then(() => {
            res.redirect("/accommodation/" + req.params.id);
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
  db.getDestinationAndAccommodation(req.params.id) // Look up destination and accommodation by accommodation id, and join these tales
    .then(destinationAndAccommodation => {
      if (destinationAndAccommodation.userId === req.session.passport.user) {
        db.deleteAccommodation(req.params.id) // Delete the accommodation based on id
          .then(() => {
            res.redirect("/accommodation/" + destinationAndAccommodation.destinationId); // take them back to the accommodation page
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
  db.getDestinationAndAccommodation(req.params.id)
    .then(destinationAndAccommodation => {
      if (destinationAndAccommodation.userId === req.session.passport.user) {
        db.updateAccommodation(req.params.id, req.body)
          .then(() => {
            res.redirect("/accommodation/" + destinationAndAccommodation.destinationId);
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
