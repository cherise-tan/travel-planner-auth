// Require the following packages
const express = require("express");
const session = require("express-session");
const hbs = require("express-handlebars");
const passport = require("passport");
const flash = require("connect-flash");

// Set up express
const app = express(); // Save express() as a variable for ongoing use
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); 

app.use(session({ // Setup for express session
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Middleware setup for handlebars
app.set('views', './views');
app.engine("hbs", hbs({defaultLayout: "dashboard", extname: ".hbs" }));
app.set("view engine", "hbs");

// Middleware setup for passport
require("./config/passport")(passport); // Require passport configuration

app.use(passport.initialize());
app.use(passport.session());

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
app.use("/destinations", ensureAuthenticated, destinationRoutes);
app.use("/accommodation", ensureAuthenticated, accommodationRoutes);
app.use("/activities", ensureAuthenticated, activitiesRoutes);

// Export 'app' for use elsewhere
module.exports = app;
