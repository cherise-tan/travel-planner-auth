// jshint esversion:6

// require the following data files so they can be used in our seed
const activitiesData = require("../data/activitiesdata.js");
const destinationsData = require("../data/destinationsdata.js");
const accommodationsData = require("../data/accommodationsdata.js");

exports.seed = function(knex, Promise) {
  // first delete ALL existing entries across all three tables
  return knex('activities').del()
    .then(() => {
      return knex('accommodations').del();
    })
    .then(() => {
      return knex('destinations').del();
    })

    // then insert seed entries
    .then(() => {
      return knex("destinations").insert(destinationsData);
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
