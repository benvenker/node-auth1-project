const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
// add restricted
const knexSessionStore = require("connect-session-knex")(session);
// add routers
const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router.js");

const server = express();

const sessionConfig = {
  name: "bens-cookie",
  secret: "supercalafragilistic",
  cookie: {
    maxAge: 3600 * 1000,
    secure: false,
    httpOnly: true,
  },
  resave: false, // should be true in prod
  saveUninitialized: false,

  store: new knexSessionStore({
    knex: require("../database/db-config"),
    tableName: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 3600 * 1000,
  }),
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
