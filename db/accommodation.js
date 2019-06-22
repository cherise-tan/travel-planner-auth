// Set up knex
const environment = process.env.NODE_ENV || 'development';    // // If something else isn't setting ENV, use development
const config = require('../knexfile')[environment];    // Require environment's settings from knexfile
const connection = require('knex')(config);        // Connect to DB via knex using environment's settings

// Export functions so they can be used in routes.js
module.exports = {
  getAccommodations,
  addAccommodation,
  deleteAccommodation,
  updateAccommodation,
  getDestinationAndAccommodation
};

function getAccommodations(id) {
  return connection("accommodations")
  .where("destinationId", id)
  .select();
}

function addAccommodation(accommodation, destinationId) {
  return connection("accommodations")
  .insert({
    name: accommodation.name, 
    address:accommodation.address, 
    website:accommodation.website, 
    notes:accommodation.notes, 
    destinationId: destinationId
  });
}

function deleteAccommodation(id) {
  return connection("accommodations")
  .where("accommodationId", id)
  .delete();
}

function updateAccommodation(id, accommodation) {
  return connection("accommodations")
  .where("accommodationId", id)
  .update({
    name: accommodation.name, 
    address:accommodation.address, 
    website:accommodation.website, 
    notes:accommodation.notes
  });
}

function getDestinationAndAccommodation(id) {
  return connection("accommodations")
  .where("accommodationId", id)
  .join("destinations", "accommodations.destinationId", "=", "destinations.destinationId")
  .first();
}