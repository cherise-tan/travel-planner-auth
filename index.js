// jshint esversion:6

// this is the main file which will by run by 'yarn'
const app = require("./app"); // this requires the 'app.js' file

const port = process.env.PORT || 3000; // server will run on port 3000, unless it is deployed

app.listen(port, function(){ // server will listen on the specified port and will log a message when this occurs
  console.log("Port is running on "+ port);
});
