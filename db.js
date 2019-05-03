// jshint esversion:6

//from github
const env = process.env.ENVIRONMENT || 'development';
const config = require('../knexfile.js')[env];
module.exports = require('knex')(config);

//requiring necessary modules into express - paths may need to be adjusted depending on where in the project they're used
const environment = process.env.NODE_ENV || 'development';    // if something else isn't setting ENV, use development
const configuration = require('../knexfile')[environment];    // require environment's settings from knexfile
const database = require('knex')(configuration);              // connect to DB via knex using env's settings
