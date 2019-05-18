// jshint esversion:6

//requiring necessary modules into express
const environment = process.env.NODE_ENV || 'development';    // if something else isn't setting ENV, use development
const config = require('../knexfile')[environment];    // require environment's settings from knexfile
const connection = require('knex')(config);        // connect to DB via knex using environment's settings

// export functions so they can be used in routes.js
module.exports = {
  getUser,
  getUserById,
  addUser
};

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
