const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "kalimbasongs",
  password: "Kakacarrotcake12",
  port: 5432
});

pool.query("SELECT id FROM songs WHERE id=0", (err, res) => {
  console.log(err, res);
  pool.end();
});
