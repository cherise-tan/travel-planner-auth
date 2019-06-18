const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Require the users db file so functions can be called from it
const db = require("../db/users");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({
      usernameField: "email"
    }, (email, password, done) => {

      // Change email to lowercase -> email should not be case-sensitive
      email = email.toLowerCase();

      // Check if user exists in the database
      db.getUser(email)
        .then(user => {
          if (!user) {
            return done(null, false, {
              message: "That email is not registered"
            });
          } else {
            // Match the user's password
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if(err) throw err;
              if(isMatch) {
                return done(null, user);
              } else{
                return done(null, false, {message: "Password incorrect"});
              }
            });
          }
        })
        .catch(err => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.userId);
  });

  passport.deserializeUser((id, done) => {
    db.getUserById(id)
    .then((user) => {done(null, user);})
    .catch((err) => {done(err, null);});
  });
};