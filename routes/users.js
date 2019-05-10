// jshint esversion:6

const express = require("express");
const router = express.Router();

// Require the db file so functions can be called from it
const db = require("../db");

// Login page
router.get("/login", (req, res) => {
  res.render("login");
});

// Register page
router.get("/register", (req, res) => {
  res.render("register");
});

// Register handle
router.post("/register", (req, res) => {
  // Get variables from the form
  const {
    name,
    email,
    password,
    password2
  } = req.body;

  let errors = [];

  // Check password is 6+ characters
  if (password.length < 6) {
    errors.push({
      msg: "Password should be at least 6 characters"
    });
  }

  // Check passwords match
  if (password != password2) {
    errors.push({
      msg: "Passwords do not match"
    });
  }

  // Re-render the register page if validation fails
  if (errors.length > 0) {
    // Validation failed
    var unsuccessfulLogin = {
      errors,
      name,
      email,
      password,
      password2
    };
    res.render("register", {
      unsuccessfulLogin: unsuccessfulLogin
    });
  } else {
    // Validation passed
    // Check whether email is unique
    db.getUser(email)
      .then(users => {
        if (users) {
          // User exists
          errors.push({
            msg: "Email is already registered"
          });
          var unsuccessfulLogin = {
            errors,
            name,
            email,
            password,
            password2
          };
          res.render("register", {
            unsuccessfulLogin: unsuccessfulLogin
          });
        } else {

        }
      });



  }
});


module.exports = router;
