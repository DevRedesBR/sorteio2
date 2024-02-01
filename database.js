require("dotenv").config();
const { Client } = require("pg");

async function db(q, params) {
  const client = new Client({
    user: process.env.USERNAME_DATABASE,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.PWD_DATABASE,
    port: process.env.DATABASE_PORT,
  });

  try {
    await client.connect();
    const res = params ? await client.query(q, params) : await client.query(q);
    return res.rows;
  } catch (error) {
    console.error('Error executing query', error.stack);
    throw error;
  } finally {
    await client.end();
  }
}

module.exports = db;
