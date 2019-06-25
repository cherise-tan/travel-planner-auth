// Require the following data files so they can be used in our seed
const usersData = require("../data/usersdata.js");
const destinationsData = require("../data/destinationsdata.js");
const activitiesData = require("../data/activitiesdata.js");
const accommodationsData = require("../data/accommodationsdata.js");

exports.seed = function (knex, Promise) {
  // First delete ALL existing entries across all four tables
  return knex('activities').del()
    .then(() => {
      return knex('accommodations').del();
    })
    .then(() => {
      return knex('destinations').del();
    })
    .then(() => {
      return knex('users').del();
    })

    // Then insert seed entries
    .then(() => {
      return knex("users").insert(usersData);
    })
    .then(() => {
      let destinationPromises = [];
      destinationsData.forEach((destination) => {
        let user = destination.userName;
        destinationPromises.push(createDestination(knex, destination, user));
      });
      return Promise.all(destinationPromises);
    })
    .then(() => {
      let activityPromises = [];
      activitiesData.forEach((activity) => {
        let destination = activity.city;
        activityPromises.push(createActivity(knex, activity, destination));
      });
      return Promise.all(activityPromises);
    })
    .then(() => {
      let accommodationPromises = [];
      accommodationsData.forEach((accommodation) => {
        let destination = accommodation.city;
        accommodationPromises.push(createAccommodation(knex, accommodation, destination));
      });
      return Promise.all(accommodationPromises);
    });
};

const createDestination = (knex, destination, user) => {
  return knex("users").where("name", user).first()
    .then((userRecord) => {
      return knex('destinations').insert({
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
        userId: userRecord.userId
      });
    });
};

const createActivity = (knex, activity, destination) => {
  return knex("destinations").where('city', destination).first()
    .then((destinationRecord) => {
      return knex('activities').insert({
        name: activity.name,
        website: activity.website,
        notes: activity.notes,
        destinationId: destinationRecord.destinationId
      });
    });
};

const createAccommodation = (knex, accommodation, destination) => {
  return knex("destinations").where('city', destination).first()
    .then((destinationRecord) => {
      return knex('accommodations').insert({
        name: accommodation.name,
        address: accommodation.address,
        website: accommodation.website,
        notes: accommodation.notes,
        destinationId: destinationRecord.destinationId
      });
    });
};