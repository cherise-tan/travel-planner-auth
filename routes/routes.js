// jshint esversion: 6

// use the express package
const express = require("express");

// require the db file so functions can be called from it
const db = require("../db");

// set up express router
const router = express.Router();

// DESTINATIONS ROUTES
router.get("/", (req, res) => { // set up index route
  db.getDestinations()
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
  db.addDestinations(req.body) // add new destination to the database
    .then(destinations => {
      res.redirect("/"); // take them back to the homepage which will display all the information
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message);
    });
});

router.post("/delete/:id", (req, res) => { // set up delete route
  db.deleteDestination(req.params.id) // delete destination according to id
    .then(destinations => {
      res.redirect("/"); // take them back to the homepage which will display all the information
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message);
    });
});

router.get("/update/:id/", (req, res) => { // set up update route
  db.selectDestination(req.params.id) // select the destination by id
    .then(destinations => {
      res.render("destinations", { // then render the destinations file with data from the selected destination
        destinations: destinations
      });
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message);
    });
});

router.post("/update/:id", (req, res) => {
  db.updateDestination(req.params.id, req.body) // update the destination by its id, passing in the information from the form
    .then(destinations => {
      res.redirect("/"); // take them back to the homepage which will display all the information
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message);
    });
});

// ACTIVITIES ROUTES
router.get("/activities/:id", (req, res) => { // set up ACTIVITIES get route, according to the selected destination's id
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

router.post("/activities/add/:id", (req, res) => {
  db.addActivity(req.body, req.params.id) // add the activity, based on the form information and the destination id
  .then(activities => {
    res.redirect("/activities/" + req.params.id); // take them back to the activities page which will display all the activities
  })
  .catch(err => {
    res.status(500).send("DATABASE ERROR: " + err.message);
  });
});

router.post("/delete/activity/:id/:destinationId", (req, res) => {
  db.deleteActivity(req.params.id) // delete the activity based on id
    .then(destinations => {
      res.redirect("/activities/" + req.params.destinationId); // take them back to the activities page which will display all the activities
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message);
    });
});

router.post("/activities/update/:id/:destinationId", (req, res) => {
  db.updateActivity(req.params.id, req.body) // update the activity based on activity id and destination id
  .then(activities => {
    res.redirect("/activities/" + req.params.destinationId); // take them back to the activities page which will display all the activities
  })
  .catch(err => {
    res.status(500).send("DATABASE ERROR: " + err.message);
  });
});

// ACCOMMODATIONS ROUTES
router.get("/accommodation/:id", (req, res) => { // set up ACTIVITIES get route, according to the selected destination's id
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

router.post("/accommodation/add/:id", (req, res) => {
  db.addAccommodation(req.body, req.params.id) // add the accommodation, based on the form information and the destination id
  .then(accommodations => {
    res.redirect("/accommodation/" + req.params.id); // take them back to the accommodation page which will display all the accommodations
  })
  .catch(err => {
    res.status(500).send("DATABASE ERROR: " + err.message);
  });
});

router.post("/delete/accommodation/:id/:destinationId", (req, res) => {
  db.deleteAccommodation(req.params.id) // delete the accommodation based on id
    .then(accommodations => {
      res.redirect("/accommodation/" + req.params.destinationId); // take them back to the accommodation page which will display all the accommodations
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message);
    });
});

router.post("/accommodation/update/:id/:destinationId", (req, res) => {
  db.updateAccommodation(req.params.id, req.body) // update the activity based on activity id and destination id
  .then(accommodations => {
    res.redirect("/accommodation/" + req.params.destinationId); // take them back to the accommodation page which will display all the accommodations
  })
  .catch(err => {
    res.status(500).send("DATABASE ERROR: " + err.message);
  });
});

// export the router so we can use it elsewhere if needed (i.e. within the express module)
module.exports = router;
