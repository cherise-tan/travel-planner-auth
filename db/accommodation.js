// jshint esversion:6

//requiring necessary modules into express
const environment = process.env.NODE_ENV || 'development';    // if something else isn't setting ENV, use development
const config = require('../knexfile')[environment];    // require environment's settings from knexfile
const connection = require('knex')(config);        // connect to DB via knex using environment's settings

// export functions so they can be used in routes.js
module.exports = {
  getAccommodations,
  addAccommodation,
  deleteAccommodation,
  updateAccommodation,
  getDestinationAndAccommodation
};

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

function getDestinationAndAccommodation(id, testConn) {
  const conn = testConn || connection;
  return conn("accommodations")
  .where("accommodationId", id)
  .join("destinations", "accommodations.destinationId", "=", "destinations.destinationId")
  .first();
}
