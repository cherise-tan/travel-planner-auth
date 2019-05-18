// jshint esversion:6

//requiring necessary modules into express
const environment = process.env.NODE_ENV || 'development';    // if something else isn't setting ENV, use development
const config = require('../knexfile')[environment];    // require environment's settings from knexfile
const connection = require('knex')(config);        // connect to DB via knex using environment's settings

// export functions so they can be used in routes.js
module.exports = {
  getActivities,
  addActivity,
  deleteActivity,
  updateActivity,
  getDestinationAndActivity
};

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
  .where("activityId", id)
  .delete(); // delete the activity according to id
}

function updateActivity(id, activity, testConn) {
  const conn = testConn || connection;
  return conn("activities")
  .where("activityId", id)
  .update({name: activity.name, website:activity.website, notes:activity.notes});
  // update the activity in the database according to its id and information from the form
}

function getDestinationAndActivity(id, testConn) {
  const conn = testConn || connection;
  return conn("activities")
  .where("activityId", id)
  .join("destinations", "activities.destinationId", "=", "destinations.destinationId")
  .first();
}
