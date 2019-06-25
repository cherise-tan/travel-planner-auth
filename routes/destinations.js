const express = require("express");
const router = express.Router();

// Require the db file so database queries (as functions) can be called from it
const db = require("../db/destinations");

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

router.get("/add", (req, res) => {
  res.render("destinations");
});

router.post("/add", (req, res) => {
  db.addDestinations(req.body, req.session.passport.user)
    .then(destinations => {
      res.redirect("/destinations");
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message);
    });
});

router.post("/delete/:id", (req, res) => {
  db.selectDestination(req.params.id)
    .then(destinations => {
      if (destinations.userId === req.session.passport.user) {
        db.deleteDestination(req.params.id)
          .then(destinations => {
            res.redirect("/destinations");
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

router.get("/update/:id", (req, res) => {
  db.selectDestination(req.params.id) // Select the destination by id
    .then(destinations => {
      if (destinations.userId === req.session.passport.user) { // Checks if cookie user id matches the destination user id
        res.render("destinations", { // Then render the destinations file with data from the selected destination
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
        db.updateDestination(req.params.id, req.body)
          .then(destinations => {
            res.redirect("/destinations");
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
