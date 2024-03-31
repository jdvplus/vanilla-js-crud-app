const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: "faccia+38bruTT'!",
  port: 5432,
});

pool.on('connect', () => console.log('Connected to Postgres DB'));

module.exports = pool;
