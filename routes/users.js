// jshint esversion:6

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Require the db file so functions can be called from it
const db = require("../db");

// Register page
router.get("/register", (req, res) => {
  if (req.user){ // redirect user to their destinations page if they are logged in
    res.redirect("/destinations");
  } else {
    res.render("register", {layout: "home.hbs"});
  }
});

// Register handle
router.post("/register", (req, res) => {
  // Get variables from the form
  const {
    name,
    password,
    password2
  } = req.body;

  const formEmail = req.body.email;
  const email = formEmail.toLowerCase(); // Change stored email to lowercase

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
    res.render("register",  {
      unsuccessfulLogin: unsuccessfulLogin,
      layout: "home.hbs"
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
            unsuccessfulLogin: unsuccessfulLogin,
            layout: "home.hbs"
          });
        } else {
          const newUser = {
            name,
            email,
            password
          };

          // Hash password
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
              // Set password to hashed
              newUser.password = hash;
              // Save the user
              db.addUser(newUser)
                .then(users => {
                  req.flash("successMsg", "You are now registered and can log in");
                  res.redirect("/users/login");
                })
                .catch(err => {
                  res.status(500).send("DATABASE ERROR: " + err.message);
                });
            }));
        }
      });
  }
});

// Login page
router.get("/login", (req, res) => {
  if (req.user){ // redirect user to their destinations page if they are logged in
    res.redirect("/destinations");
  } else {
    res.render("login", {layout: "home.hbs"});
  }
});

// Login handle
router.post("/login", (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: "/destinations/",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

// Logout handle
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("successMsg", "You have been logged out");
  res.redirect("/users/login");
});

module.exports = router;
