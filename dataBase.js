const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool({
    host: config.HOST,
    port: config.DBPORT,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE
});

module.exports = pool;
