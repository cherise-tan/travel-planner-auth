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

function getActivities(id) {
  return connection("activities")
  .where("destinationId", id)
  .select();
}

function addActivity(activity, destinationId) {
  return connection("activities")
  .insert({
    name: activity.name, 
    website:activity.website, 
    notes:activity.notes, 
    destinationId: destinationId
  });
}

// Get destination and activity (join) -> to check if user is authorised to change the selected content
function getDestinationAndActivity(id) {
  return connection("activities")
  .where("activityId", id)
  .join("destinations", "activities.destinationId", "=", "destinations.destinationId")
  .first();
}

function deleteActivity(id) {
  return connection("activities")
  .where("activityId", id)
  .delete();
}

function updateActivity(id, activity) {
  return connection("activities")
  .where("activityId", id)
  .update(activity);
}