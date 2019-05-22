// jshint esversion:6

// This is the main file which will by run by 'nodemon'
const app = require("./app"); // This requires the 'app.js' file

const port = process.env.PORT || 3000; // Server will run on port 3000, unless it is deployed

app.listen(port, function(){ // Server will listen on the specified port and will log a message when this occurs
  console.log("Port is running on "+ port);
});
