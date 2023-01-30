const Pool = require("pg").Pool;

require("dotenv").config();

const pool = new Pool({
  user: process.env.USERNAMEDB,
  password: process.env.PASSWORDDB,
  host: process.env.HOST,
  port: process.env.PORTDB,
  database: "todo_app",
});

module.exports = pool;
