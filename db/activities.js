// jshint esversion:6

const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[environment];
const connection = require('knex')(config);

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
  .select();
}

function addActivity(activity, destinationId, testConn) {
  const conn = testConn || connection;
  return conn("activities")
  .insert({name: activity.name, website:activity.website, notes:activity.notes, destinationId: destinationId});
}

function deleteActivity(id, testConn) {
  const conn = testConn || connection;
  return conn("activities")
  .where("activityId", id)
  .delete();
}

function updateActivity(id, activity, testConn) {
  const conn = testConn || connection;
  return conn("activities")
  .where("activityId", id)
  .update({name: activity.name, website:activity.website, notes:activity.notes});
}

function getDestinationAndActivity(id, testConn) {
  const conn = testConn || connection;
  return conn("activities")
  .where("activityId", id)
  .join("destinations", "activities.destinationId", "=", "destinations.destinationId")
  .first();
}
