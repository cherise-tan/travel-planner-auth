// jshint esversion:6

const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[environment];
const connection = require('knex')(config);

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
  .insert(user);
}
