const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[environment];
const connection = require('knex')(config);

module.exports = {
  getDestinations,
  selectDestination,
  addDestinations,
  deleteDestination,
  updateDestination
};

function getDestinations(id) { // Select destination/s by User ID
  return connection("destinations")
    .select()
    .where("userId", id);
}

function selectDestination(id) { // Select destination by Destination ID
  return connection("destinations")
    .where("destinationId", id)
    .first();
}

function addDestinations(destination, userId) {
  return connection("destinations")
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
    });
}

function deleteDestination(id) {
  return connection("destinations")
    .where("destinationId", id)
    .delete();
}

function updateDestination(id, destination) {
  return connection("destinations")
    .where("destinationId", id)
    .update(destination);
}