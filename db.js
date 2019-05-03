// jshint esversion:6

//requiring necessary modules into express
const environment = process.env.NODE_ENV || 'development';    // if something else isn't setting ENV, use development
const config = require('./knexfile')[environment];    // require environment's settings from knexfile
const connection = require('knex')(config);              // connect to DB via knex using env's settings

module.exports = {
  // we export so we can call these functions over in routes.js above
  getDestinations,
  addDestinations,
  selectDestination,
  deleteDestination
};

function getDestinations(testConn) {
  const conn = testConn || connection;
  return conn("destinations").select(); //get me all of the entries in the database (returns an array of objects)
}

function addDestinations(destination, testConn) {
  const conn = testConn || connection;
  return conn("destinations")
  .insert(destination);
}

function selectDestination(id, testConn) {
  const conn = testConn || connection;
  return conn("destinations")
  .where("id", id)
  .first();
}

function deleteDestination(id, testConn) {
  const conn = testConn || connection;
  return conn("destinations")
  .where("id", id)
  .delete(id); // delete destination from the database
}
