// jshint esversion: 6

// use the express package
const express = require("express");

// require the db file so functions can be called from it
const db = require("../db");

// set up express router
const router = express.Router();

// set up home route
router.get("/", (req, res) => res.send("Hello hi"));




// router.get("/", (req, res) => {
//   db.getDrugs() // go to the database and get us the data
//     .then(drugs => {
//       res.render("index", { drugs: drugs }); // render the simple html based index.hbs page and inject the data into it (the drugs from the database!)
//     })
//     .catch(err => {
//       res.status(500).send("DATABASE ERROR: " + err.message); // something broke!
//     });
// });



// export the router so we can use it elsewhere if needed (i.e. within the express module)
module.exports = router;
