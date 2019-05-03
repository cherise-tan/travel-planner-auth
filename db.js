// jshint esversion:6

//requiring necessary modules into express
const environment = process.env.NODE_ENV || 'development';    // if something else isn't setting ENV, use development
const configuration = require('./knexfile')[environment];    // require environment's settings from knexfile
const database = require('knex')(configuration);              // connect to DB via knex using env's settings

module.exports = {
  // we export so we can call these functions over in routes.js above

};

// function getDrugs(testConn) {
//   const conn = testConn || connection;
//   return conn("drugs").select(); //get me all of the entries in the database (returns an array of objects)
// }
