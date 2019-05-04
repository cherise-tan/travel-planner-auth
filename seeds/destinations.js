// jshint esversion:6

const activitiesData = require("../data/activitiesdata.js");
const destinationsData = require("../data/destinationsdata.js");
const accommodationsData = require("../data/accommodationsdata.js");

exports.seed = function(knex, Promise) {
  return knex('activities').del() // first deletes ALL existing entries
    .then(() => {
      return knex('accommodations').del();
    })
    .then(() => {
      return knex('destinations').del();
    })
    .then(() => { // then inserts seed entries
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
        destinationId: destinationRecord.id
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
        destinationId: destinationRecord.id
      });
    });
};
