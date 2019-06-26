// Require the 'app.js' file
const app = require("./app");

// Run the server on port 3000, unless it is deployed (Heroku sets process.env.PORT)
const port = process.env.PORT || 3000;

// Server will listen on the specified port and will log a message when this occurs
app.listen(port, function () {
  console.log("Port is running on " + port);
});
