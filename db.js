const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'USERS',
    password: 'secret',
    port: 5432,
});

pool.on('connect', () => console.log('Connected to DB!'));

module.exports = pool;
