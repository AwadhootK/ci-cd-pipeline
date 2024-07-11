const express = require('express');
const cors = require('cors');
// const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/ping', (req, res, next) => {
    res.send('pong');
});

app.get('/users', async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

app.post('/edituser', async (req, res, next) => {
    try {
        const { username, email } = req.body;

        console.log(username, email);
        const result = await pool.query(
            'UPDATE users SET email = $1 WHERE name = $2',
            [email, username]
        );
        console.log('updated!');
        return res.json(result.rows);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server error');
    }
});

app.post('/deleteuser', async (req, res, next) => {
    try {
        const { username } = req.body;

        console.log(username);
        const result = await pool.query(
            'DELETE FROM users WHERE name = $1',
            [username]
        );
        console.log('deleted!');
        return res.json(result.rows);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server error');
    }
});


app.listen(3000, () => {
    console.log("Server started on port 3000!");
});