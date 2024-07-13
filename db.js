const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
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

const createTable = async () => {
    try {
        const client = await pool.connect();
        await client.query(createTableQuery);
        console.log('Table created successfully!');

        await client.query(insertDataQuery);
        console.log('Data entered successfully!');

        client.release();
    } catch (err) {
        console.error('Error creating table', err);
    } finally {
        await pool.end();
    }
};

module.exports = { pool, createTable };
