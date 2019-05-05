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
  res.render("destinations");
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
router.post("/delete/:id", (req, res) => {
  db.deleteDestination(req.params.id) // delete destination according to id
    .then(destinations => {
      res.redirect("/"); // take them back to the homepage which will display all the information
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message); // something broke!
    });
});

// set up update route
router.get("/update/:id/", (req, res) => {
  db.selectDestination(req.params.id)
    .then(destinations => {
      res.render("destinations", {
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

// ACTIVITIES ROUES
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

router.post("/activities/add/:id", (req, res) => {
  db.addActivity(req.body, req.params.id)
  .then(activities => {
    res.redirect("/activities/" + req.params.id);
  })
  .catch(err => {
    res.status(500).send("DATABASE ERROR: " + err.message); // something broke!
  });
});

router.post("/delete/activity/:id/:destinationId", (req, res) => {
  db.deleteActivity(req.params.id)
    .then(destinations => {
      res.redirect("/activities/" + req.params.destinationId); // take them back to the homepage which will display all the information
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message); // something broke!
    });
});

router.post("/activities/update/:id/:destinationId", (req, res) => {
  db.updateActivity(req.params.id, req.body)
  .then(activities => {
    res.redirect("/activities/" + req.params.destinationId);
  })
  .catch(err => {
    res.status(500).send("DATABASE ERROR: " + err.message); // something broke!
  });
});

// ACCOMMODATIONS ROUTES
router.get("/accommodation/:id", (req, res) => {
  db.selectDestination(req.params.id)
    .then(destinations => {
      db.getAccommodations(req.params.id)
        .then(accommodations => {
          res.render("accommodation", {
            destinations: destinations,
            accommodations: accommodations
          });
        });
    });
});

router.post("/accommodation/add/:id", (req, res) => {
  db.addAccommodation(req.body, req.params.id)
  .then(accommodations => {
    res.redirect("/accommodation/" + req.params.id);
  })
  .catch(err => {
    res.status(500).send("DATABASE ERROR: " + err.message); // something broke!
  });
});

router.post("/delete/accommodation/:id/:destinationId", (req, res) => {
  db.deleteAccommodation(req.params.id)
    .then(accommodations => {
      res.redirect("/accommodation/" + req.params.destinationId); // take them back to the homepage which will display all the information
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message); // something broke!
    });
});

router.post("/accommodation/update/:id/:destinationId", (req, res) => {
  db.updateAccommodation(req.params.id, req.body)
  .then(accommodations => {
    res.redirect("/accommodation/" + req.params.destinationId);
  })
  .catch(err => {
    res.status(500).send("DATABASE ERROR: " + err.message); // something broke!
  });
});

// export the router so we can use it elsewhere if needed (i.e. within the express module)
module.exports = router;
