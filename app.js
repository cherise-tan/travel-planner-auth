// Require the following packages
const express = require("express");
const session = require("express-session");
const hbs = require("express-handlebars");
const passport = require("passport");
const flash = require("connect-flash");

// Require the .env file (containing secret information)
require('dotenv').config();

// Set up express
const app = express(); // Create the express application -> named 'app'
app.use(express.urlencoded({ extended: true })); // Allows parsing of requests (POST) - based off body-parser
app.use(express.static("public")); // Serve static files from the 'public' directory

app.use(session({ // Setup for express session
  secret: process.env.SECRET, // The 'secret' is used as the SALT for the session's hash function
  resave: true,
  saveUninitialized: true
}));

// Middleware setup for handlebars
app.set('views', './views'); // Point to the 'views' folder - contains handlebars files
app.engine("hbs", hbs({defaultLayout: "loggedin", extname: ".hbs" }));
app.set("view engine", "hbs");

// Middleware setup for passport
require("./config/passport")(passport); // Require passport config file, passing 'passport' as an argument

app.use(passport.initialize()); // Initialises the authentication module
app.use(passport.session()); // Allows use of persistent login sessions (via session cookie)

const {ensureAuthenticated} = require("./config/auth"); // Pull in 'ensureAuthenticated' to protect routes

// Set up connect flash
app.use(flash());

app.use((req, res, next) => { // Global variables for flash (allows colours)
  res.locals.successMsg = req.flash("successMsg");
  res.locals.errorMsg = req.flash("errorMsg");
  res.locals.error = req.flash("error");
  next();
});

// Import and save the routes folders
const routes = require("./routes/routes");
const usersRoutes = require("./routes/users");
const destinationRoutes = require("./routes/destinations");
const activitiesRoutes = require("./routes/activities");
const accommodationRoutes = require("./routes/accommodation");

// Set up routes
app.use("/", routes);
app.use("/users", usersRoutes);
app.use("/destinations", ensureAuthenticated, destinationRoutes); // User will be redirected to 'login' if not authenticated
app.use("/accommodation", ensureAuthenticated, accommodationRoutes);
app.use("/activities", ensureAuthenticated, activitiesRoutes);

// Export 'app' for use elsewhere
module.exports = app;
