// create the express server here

require("dotenv").config();
const PORT = process.env.PORT || 3000;

const express = require("express");
const server = express();
const morgan = require("morgan");

server.use(morgan("dev"));
server.use(express.json());

const cors = require("cors");
server.use(cors());

const apiRouter = require("./api");
server.use("/api", apiRouter);

const client = require("./db/client");
const { getUserById } = require("./db");

server.use((error, req, res, next) => {
  res.status(400);
  res.send(error);
});

server.listen(PORT, () => {
  console.log(`Server is up`);
  client.connect();
});