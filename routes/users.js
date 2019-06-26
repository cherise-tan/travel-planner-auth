// Set up express
const express = require("express");
const router = express.Router();

// Set up passport and bcrypt for authentication and authorisation
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Require the db file so functions can be called from it
const db = require("../db/users");

router.get("/register", (req, res) => {
  if (req.user) { // Redirect user to their destinations page if they are logged in (req.session has a 'user')
    res.redirect("/destinations");
  } else {
    res.render("register", { layout: "loggedout.hbs" }); // Otherwise render the 'register' page
  }
});

// Handle registration
router.post("/register", (req, res) => {
  // Get variables from the form
  const {
    name,
    password,
    password2
  } = req.body;
  const formEmail = req.body.email;

  // Change stored email to lowercase
  const email = formEmail.toLowerCase();

  // Set up errors array -> for VALIDATION
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

  if (errors.length > 0) {
    // Validation fails if any of the above requirements fails
    var unsuccessfulLogin = {
      errors,
      name,
      email,
      password,
      password2
    };
    // Re-render the registration page, passing in 'errors' to inform the user what went wrong
    res.render("register", {
      unsuccessfulLogin: unsuccessfulLogin,
      layout: "loggedout.hbs"
    });
  } else {
    // If validation passes, then check whether email is unique
    db.getUser(email)
      .then(users => {
        if (users) {
          // If an email already exists in the database, send an error and re-render the registration page
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
            layout: "loggedout.hbs"
          });
        } else {
          // If an email is unique, proceed with inserting the new user into the database
          const newUser = {
            name,
            email,
            password
          };

          // Hash password
          bcrypt.genSalt(10, (err, salt) => // Generate a salt
            bcrypt.hash(password, salt, (err, hash) => { // Hash the password with the salt
              if (err) throw err;
              // Set password to hashed
              newUser.password = hash;
              // Save the user
              db.addUser(newUser)
                .then(() => {
                  req.flash("successMsg", "You are now registered and can log in");
                  res.redirect("/users/login");
                })
            }));
        }
      })
      .catch(err => {
        res.status(500).send("DATABASE ERROR: " + err.message);
      });
  }
});

router.get("/login", (req, res) => {
  if (req.user) { // Redirect user to their destinations page if they are logged in
    res.redirect("/destinations");
  } else {
    res.render("login", { layout: "loggedout.hbs" });
  }
});

//Handle login
router.post("/login", (req, res, next) => {
  // Use password to authenticate user, and redirect to the appropriate page depending on the response
  passport.authenticate('local', {
    successRedirect: "/destinations",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

// Handle logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("successMsg", "You have been logged out");
  res.redirect("/users/login");
});

module.exports = router;