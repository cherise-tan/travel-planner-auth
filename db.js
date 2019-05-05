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
  deleteDestination,
  updateDestination,

  getActivities,
  addActivity,
  deleteActivity,
  updateActivity,

  getAccommodations,
  addAccommodation,
  deleteAccommodation

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

function updateDestination(id, destination, testConn) {
  const conn = testConn || connection;
  return conn("destinations")
  .where("id", id)
  .update(destination); //update destination
}

// Activity queries
function getActivities(id, testConn) {
  const conn = testConn || connection;
  return conn("activities")
  .where("destinationId", id)
  .select(); //get me all of the entries in the database (returns an array of objects)
}

function addActivity(activity, destinationId, testConn) {
  const conn = testConn || connection;
  return conn("activities")
  .insert({name: activity.name, website:activity.website, notes:activity.notes, destinationId: destinationId});
}

function deleteActivity(id, testConn) {
  const conn = testConn || connection;
  return conn("activities")
  .where("id", id)
  .delete(id);
}

function updateActivity(id, activity, testConn) {
  const conn = testConn || connection;
  return conn("activities")
  .where("id", id)
  .update({name: activity.name, website:activity.website, notes:activity.notes}); //update destination
}

// ACCOMMODATION QUERIES
function getAccommodations(id, testConn) {
  const conn = testConn || connection;
  return conn("accommodations")
  .where("destinationId", id)
  .select(); //get me all of the entries in the database (returns an array of objects)
}

function addAccommodation(accommodation, destinationId, testConn) {
  const conn = testConn || connection;
  return conn("accommodations")
  .insert({name: accommodation.name, address:accommodation.address, website:accommodation.website, notes:accommodation.notes, destinationId: destinationId});
}

function deleteAccommodation(id, testConn) {
  const conn = testConn || connection;
  return conn("accommodations")
  .where("id", id)
  .delete(id);
}
