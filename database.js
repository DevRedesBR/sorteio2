const db = async function (q, params) {
  console.log("Parametro -> " + params);
  require("pg");
  require("dotenv").config();
  const { Client } = require("pg");

  var client = new Client({
    user: process.env.USERNAME_DATABASE,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.PWD_DATABASE,
    port: process.env.DATABASE_PORT,
  });

  await client.connect();
  let res;
  let result;
  if (params) {
    res = await client.query(q, params);
    result = res.rows;
  } else {
    res = await client.query(q);
  }
  let jsonData = await res.rows;
  await client.end();
  return jsonData;
};

module.exports = db;
