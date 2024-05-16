// backend/config/pool.js

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'loginSignup3',
    password: 'admin',
    port: 5432,
});

module.exports = pool;
