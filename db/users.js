const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[environment];
const connection = require('knex')(config);

module.exports = {
  getUser,
  getUserById,
  addUser
};

function getUser(email) {
  return connection("users")
  .select()
  .where("email", email)
  .first();
}

function getUserById(id) {
  return connection("users")
  .select()
  .where("userId", id)
  .first();
}

function addUser(user) {
  return connection("users")
  .insert(user);
}
