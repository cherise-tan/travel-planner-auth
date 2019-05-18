// jshint esversion:6

const express = require("express");
const router = express.Router();

// Require the db file so functions can be called from it
const db = require("../db/destinations");

// DESTINATIONS ROUTES
router.get("/", (req, res) => {
  db.getDestinations(req.session.passport.user)
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
  db.addDestinations(req.body, req.session.passport.user) // add new destination to the database
    .then(destinations => {
      res.redirect("/destinations"); // take them back to the homepage which will display all the information
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message);
    });
});

router.post("/delete/:id", (req, res) => { // set up delete route
  db.selectDestination(req.params.id)
    .then(destinations => {
      if (destinations.userId === req.session.passport.user) {
        db.deleteDestination(req.params.id) // delete destination according to id
          .then(destinations => {
            res.redirect("/destinations"); // take them back to the homepage which will display all the information
          })
          .catch(err => {
            res.status(500).send("DATABASE ERROR: " + err.message);
          });
      } else {
        res.redirect("/destinations");
      }
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message);
    });
});

router.get("/update/:id", (req, res) => { // set up update route
  db.selectDestination(req.params.id) // select the destination by id
    .then(destinations => {
      if (destinations.userId === req.session.passport.user) { // checks if cookie user id matches the destination user id
        res.render("destinations", { // then render the destinations file with data from the selected destination
          destinations: destinations
        });
      } else {
        res.redirect("/unauthorised");
      }
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message);
    });
});

router.post("/update/:id", (req, res) => {
  db.selectDestination(req.params.id)
    .then(destinations => {
      if (destinations.userId === req.session.passport.user) {
        db.updateDestination(req.params.id, req.body) // update the destination by its id, passing in the information from the form
          .then(destinations => {
            res.redirect("/destinations"); // take them back to the homepage which will display all the information
          })
          .catch(err => {
            res.status(500).send("DATABASE ERROR: " + err.message);
          });
      } else {
        res.redirect("/unauthorised");
      }

    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message);
    });
});


module.exports = router;
