// jshint esversion: 6

// require the following packages
const express = require("express");
const hbs = require("express-handlebars");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

// import the routes folders, and save them as variables
const routes = require("./routes/routes");
const usersRoutes = require("./routes/users");
const destinationRoutes = require("./routes/destinations");
const activitiesRoutes = require("./routes/activities");
const accommodationRoutes = require("./routes/accommodation");

// save express() as a variable for ongoing use
const app = express();

// require passport config
require("./config/passport")(passport);

// middleware setup for handlebars (copied from Leslie's project)
app.set('views', './views');
app.engine("hbs", hbs({defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

// set up for express
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// set up for express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// set up passport middleware
app.use(passport.initialize());
app.use(passport.session());

// set up for connect flash
app.use(flash());

// global variables for flash (allows colours)
app.use((req, res, next) => {
  res.locals.successMsg = req.flash("successMsg");
  res.locals.errorMsg = req.flash("errorMsg");
  res.locals.error = req.flash("error");
  next();
});

// set up routes
app.use("/", routes);
app.use("/users", usersRoutes);
app.use("/destinations", destinationRoutes);
app.use("/accommodation", accommodationRoutes);
app.use("/activities", activitiesRoutes);

// export 'app' for use elsewhere (particulalry index.js file)
module.exports = app;
