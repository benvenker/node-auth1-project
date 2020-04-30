const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const sesssion = require("express-session");
// add restricted
const knexSessionStore = require("connect-session-knex");
// add routers
const usersRouter = require("../users/users-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
// server.use(sesssion(sessionConfig));

server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
