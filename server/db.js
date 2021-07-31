const Pool = require("pg").Pool;

const pooltool = new Pool({
  user: "postgres",
  password: "9413",
  host: "localhost",
  port: 5432,
  database: "perntodo",
});

module.exports = pooltool;
