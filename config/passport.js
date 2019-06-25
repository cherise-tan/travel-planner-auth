const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Require the users db file so functions can be called from it
const db = require("../db/users");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ // Use 'LocalStrategy' (auth with username + password)
      usernameField: "email" // Defines the usernameField as 'email' (from the POST body)
    }, (email, password, done) => { // 'done' is the callback (called when work is finished -> returns the output)

      // Change email to lowercase -> email should not be case-sensitive
      email = email.toLowerCase();

      // Check if user exists in the database
      db.getUser(email)
        .then(user => {
          if (!user) {
            return done(null, false, {message: "That email is not registered"}); // 'false' indicates authentication failure
          } else {
            // Match the user's password
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if(err) throw err;
              if(isMatch) {
                return done(null, user); // Supplies passport with the authenticated user
              } else{
                return done(null, false, {message: "Password incorrect"});
              }
            });
          }
        })
        .catch(err => console.log(err));
    })
  );

  passport.serializeUser((user, done) => { // Called by middleware if a 'user' is passed
    done(null, user.userId); // Stores the userId on 'req.session.passport'
  });

  passport.deserializeUser((id, done) => {
    db.getUserById(id)
    .then((user) => {done(null, user);}); // Searches db for the full user profile and attaches it to 'req.user'
  });
};