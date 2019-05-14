// jshint esversion:6

//requiring necessary modules into express
const environment = process.env.NODE_ENV || 'development';    // if something else isn't setting ENV, use development
const config = require('./knexfile')[environment];    // require environment's settings from knexfile
const connection = require('knex')(config);        // connect to DB via knex using environment's settings

// export functions so they can be used in routes.js
module.exports = {
  getUser,
  getUserById,
  addUser,

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

// USER QUERIES
function getUser(email, testConn) {
  const conn = testConn || connection;
  return conn("users")
  .select()
  .where("email", email)
  .first();
}

function getUserById(id, testConn) {
  const conn = testConn || connection;
  return conn("users")
  .select()
  .where("userId", id)
  .first();
}

function addUser(user, testConn) {
  const conn = testConn || connection;
  return conn("users")
  .insert(user); // insert a user into the users table
}


// DESTINATION QUERIES
function getDestinations(id, testConn) { // gets destination by user id
  const conn = testConn || connection;
  return conn("destinations")
  .select()
  .where("userId", id);
}


function selectDestination(id, testConn) {// gets destination by destination id
  const conn = testConn || connection;
  return conn("destinations")
  .where("destinationId", id)
  .first(); // select the first destination by that id from the database
}

function addDestinations(destination, userId, testConn) {
  const conn = testConn || connection;
  return conn("destinations")
  .insert({
    imageUrl: destination.imageUrl,
    city: destination.city,
    country: destination.country,
    fromCity: destination.fromCity,
    fromCountry: destination.fromCountry,
    inboundDepartureDate: destination.inboundDepartureDate,
    inboundDepartureTime: destination.inboundDepartureTime,
    inboundTransport: destination.inboundTransport,
    inboundArrivalDate: destination.inboundArrivalDate,
    inboundArrivalTime: destination.inboundArrivalTime,
    toCity: destination.toCity,
    toCountry: destination.toCountry,
    outboundDepartureDate: destination.outboundDepartureDate,
    outboundDepartureTime: destination.outboundDepartureTime,
    outboundTransport: destination.outboundTransport,
    outboundArrivalDate: destination.outboundArrivalDate,
    outboundArrivalTime: destination.outboundArrivalTime,
    userId: userId
  }); // insert a destination into the destinations table
}



function deleteDestination(id, testConn) {
  const conn = testConn || connection;
  return conn("destinations")
  .where("destinationId", id)
  .delete(); // delete destination from the database according to id
}

function updateDestination(id, destination, testConn) {
  const conn = testConn || connection;
  return conn("destinations")
  .where("destinationId", id)
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
  .where("accommodationId", id)
  .delete(); // delete the accommodation according to id
}

function updateAccommodation(id, accommodation, testConn) {
  const conn = testConn || connection;
  return conn("accommodations")
  .where("accommodationId", id)
  .update({name: accommodation.name, address:accommodation.address, website:accommodation.website, notes:accommodation.notes});
  // update the accommodation in the database according to its id and information from the form
}
