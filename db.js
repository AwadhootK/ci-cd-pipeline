const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'postgres-container',
    database: 'USERS',
    password: 'secret',
    port: 5432,
});

const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE
);
`;

const insertDataQuery = `
INSERT INTO users (name, email) VALUES
    ('John Doe', 'john.doe@example.com'),
    ('Jane Smith', 'jane.smith@example.com')
ON CONFLICT (email) DO NOTHING;
`;

const initializeDatabase = async () => {
    try {
        const client = await pool.connect();
        console.log('Connected to DB!');

        await client.query(createTableQuery);
        console.log('Table created or already exists.');

        await client.query(insertDataQuery);
        console.log('Initial data inserted.');

        client.release();
    } catch (err) {
        console.error('Error executing query', err.stack);
    } finally {
        await pool.end();
    }
};

initializeDatabase();

module.exports = pool;
