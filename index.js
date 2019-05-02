// jshint esversion:6

// this is the main file and will by run by 'yarn'

const server = require("./server"); // this requires the 'server.js' file

const port = process.env.PORT || 3000; // server will run on port 3000, unless it is deployed

server.listen(port, function(){
  console.log("Port is running on "+ port);
});
