// jshint esversion:6

//requiring necessary modules into express
const environment = process.env.NODE_ENV || 'development';    // if something else isn't setting ENV, use development
const config = require('../knexfile')[environment];    // require environment's settings from knexfile
const connection = require('knex')(config);        // connect to DB via knex using environment's settings

// export functions so they can be used in routes.js
module.exports = {
  getDestinations,
  addDestinations,
  selectDestination,
  deleteDestination,
  updateDestination
};


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
