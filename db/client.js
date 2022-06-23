//  This is a place to build and export an unconnected client.

const { Client } = require("pg");

const client = new Client("postgres://localhost:5432/fitness-dev");

module.exports =  client