const client = require("./client");


// database functions

// user functions
async function createUser({ username, password }) {

  // create a new user
  const result = await client.query(`
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING id, username;
  `, [username, password]);

  // return the new user
  return result.rows[0];

  
}

async function getUser({ username, password }) {

  // get a user by username and password
  const result = await client.query(`
    SELECT * FROM users
    WHERE username = $1 AND password = $2;
  `, [username, password]);

  // return the user
  return result.rows[0];

}

async function getUserById(userId) {

  // get a user by id
  const result = await client.query(`
    SELECT * FROM users
    WHERE id = $1;
  `, [userId]);

  // return the user
  return result.rows[0];


}

async function getUserByUsername(userName) {

  // get a user by username
  const result = await client.query(`
    SELECT * FROM users
    WHERE username = $1;
  `, [userName]);

  // return the user
  return result.rows[0];

}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
