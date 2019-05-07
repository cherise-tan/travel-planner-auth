// jshint esversion:6

//requiring necessary modules into express
const environment = process.env.NODE_ENV || 'development';    // if something else isn't setting ENV, use development
const config = require('./knexfile')[environment];    // require environment's settings from knexfile
const connection = require('knex')(config);        // connect to DB via knex using environment's settings

// export functions so they can be used in routes.js
module.exports = {
  getDestinations,
  addDestinations,
  selectDestination,
  deleteDestination,
  updateDestination,

  getActivities,
  addActivity,
  deleteActivity,
  updateActivity,

  getAccommodations,
  addAccommodation,
  deleteAccommodation,
  updateAccommodation
};

// DESTINATION QUERIES
function getDestinations(testConn) {
  const conn = testConn || connection;
  return conn("destinations")
  .select(); //get me all of the entries in the database (returns an array of objects)
}

function addDestinations(destination, testConn) {
  const conn = testConn || connection;
  return conn("destinations")
  .insert(destination); // insert a destination into the destinations table
}

function selectDestination(id, testConn) {
  const conn = testConn || connection;
  return conn("destinations")
  .where("id", id)
  .first(); // select the first destination by that id from the database
}

function deleteDestination(id, testConn) {
  const conn = testConn || connection;
  return conn("destinations")
  .where("id", id)
  .delete(id); // delete destination from the database according to id
}

function updateDestination(id, destination, testConn) {
  const conn = testConn || connection;
  return conn("destinations")
  .where("id", id)
  .update(destination); //update destination according to id
}

// ACTIVITY QUERIES
function getActivities(id, testConn) {
  const conn = testConn || connection;
  return conn("activities")
  .where("destinationId", id)
  .select(); //get me all of the entries in the database (returns an array of objects), according to destinationId
}

function addActivity(activity, destinationId, testConn) {
  const conn = testConn || connection;
  return conn("activities")
  .insert({name: activity.name, website:activity.website, notes:activity.notes, destinationId: destinationId});
  // insert the activity into the database according to information from the form and the destination id
}

function deleteActivity(id, testConn) {
  const conn = testConn || connection;
  return conn("activities")
  .where("id", id)
  .delete(id); // delete the activity according to id
}

function updateActivity(id, activity, testConn) {
  const conn = testConn || connection;
  return conn("activities")
  .where("id", id)
  .update({name: activity.name, website:activity.website, notes:activity.notes});
  // update the activity in the database according to its id and information from the form
}

// ACCOMMODATION QUERIES
function getAccommodations(id, testConn) {
  const conn = testConn || connection;
  return conn("accommodations")
  .where("destinationId", id)
  .select(); //get me all of the entries in the database (returns an array of objects), according to destinationId
}

function addAccommodation(accommodation, destinationId, testConn) {
  const conn = testConn || connection;
  return conn("accommodations")
  .insert({name: accommodation.name, address:accommodation.address, website:accommodation.website, notes:accommodation.notes, destinationId: destinationId});
  // insert the accommodation into the database according to information from the form and the destination id
}

function deleteAccommodation(id, testConn) {
  const conn = testConn || connection;
  return conn("accommodations")
  .where("id", id)
  .delete(id); // delete the accommodation according to id
}

function updateAccommodation(id, accommodation, testConn) {
  const conn = testConn || connection;
  return conn("accommodations")
  .where("id", id)
  .update({name: accommodation.name, address:accommodation.address, website:accommodation.website, notes:accommodation.notes});
  // update the accommodation in the database according to its id and information from the form
}
