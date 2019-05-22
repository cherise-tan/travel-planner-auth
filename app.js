// jshint esversion: 6

// Require the following packages
const express = require("express");
const hbs = require("express-handlebars");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

// Import and save the routes folders
const routes = require("./routes/routes");
const usersRoutes = require("./routes/users");
const destinationRoutes = require("./routes/destinations");
const activitiesRoutes = require("./routes/activities");
const accommodationRoutes = require("./routes/accommodation");

// Save express() as a variable for ongoing use
const app = express();

// Require passport config
require("./config/passport")(passport);

// Middleware setup for handlebars
app.set('views', './views');
app.engine("hbs", hbs({defaultLayout: "dashboard", extname: ".hbs" }));
app.set("view engine", "hbs");

// Set up for express
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set up for express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Set up passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set up for connect flash
app.use(flash());

// Global variables for flash (allows colours)
app.use((req, res, next) => {
  res.locals.successMsg = req.flash("successMsg");
  res.locals.errorMsg = req.flash("errorMsg");
  res.locals.error = req.flash("error");
  next();
});

// Pull in ensureAuthenticated to protect routes
const {ensureAuthenticated} = require("./config/auth");

// Set up routes
app.use("/", routes);
app.use("/users", usersRoutes);
app.use("/destinations", ensureAuthenticated, destinationRoutes);
app.use("/accommodation", ensureAuthenticated, accommodationRoutes);
app.use("/activities", ensureAuthenticated, activitiesRoutes);

// Export 'app' for use elsewhere (particulalry index.js file)
module.exports = app;
