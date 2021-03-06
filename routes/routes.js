// Use the express package
const express = require("express");

// Set up express router
const router = express.Router();

router.get("/", (req, res) => {
  if (req.user) { // Redirect user to their destinations page if they are logged in (req.session has a 'user')
    res.redirect("/destinations");
  } else {
    res.render("welcome", { layout: "loggedout.hbs" }); // Otherwise render the 'welcome' page, where they can login/register
  }
});

router.get("/unauthorised", (req, res) => {
  res.render("unauthorised");
});

// Export the router so we can use it elsewhere
module.exports = router;
