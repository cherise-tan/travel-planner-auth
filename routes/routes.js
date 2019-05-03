// jshint esversion: 6

// use the express package
const express = require("express");

// set up express router
const router = express.Router();

// set up home route
router.get("/", (req, res) => res.send("Hello hi"));

// export the router so we can use it elsewhere if needed (i.e. within the express module)
module.exports = router;
