// jshint esversion: 6

// use the express package
const express = require("express");

// require the db file so functions can be called from it
const db = require("../db");

// set up express router
const router = express.Router();

// set up home route
router.get("/", (req, res) => {
  db.getDestinations()
    .then(destinations => {
      res.render("index", {
        destinations: destinations
      });
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message); // something broke!
    });
});

// set up add route
router.get("/add", (req, res) => {
  res.render("update");
});

router.post("/add", (req, res) => {
  db.addDestinations(req.body) // add new destination to the database
    .then(destinations => {
      res.redirect("/"); // take them back to the homepage which will display all the information
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message); // something broke!
    });
});

// set up delete route
router.get("/delete/:id", (req, res) => {
  db.deleteDestination(req.params.id) // delete destination according to id
    .then(destinations => {
      res.redirect("/"); // take them back to the homepage which will display all the information
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message); // something broke!
    });
});

// set up update route
router.get("/update/:id", (req, res) => {
  db.selectDestination(req.params.id)
    .then(destinations => {
      res.render("update", {
        destinations: destinations
      });
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message); // something broke!
    });
});

router.post("/update/:id", (req, res) => {
  db.updateDestination(req.params.id, req.body)
    .then(destinations => {
      res.redirect("/"); // take them back to the homepage which will display all the information
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message); // something broke!
    });
});

router.get("/activities/:id", (req, res) => {
  db.selectDestination(req.params.id)
    .then(destinations => {
      db.getActivities(req.params.id)
        .then(activities => {
          res.render("activities", {
            destinations: destinations,
            activities: activities
          });
        });
    });

});

router.get("/delete/activity/:id", (req, res) => {
  db.deleteActivity(req.params.id)
    .then(activities => {
      db.selectDestination(req.params.id)
        .then(destinations => {

              res.render("activities");
            });
        });


});


// export the router so we can use it elsewhere if needed (i.e. within the express module)
module.exports = router;
