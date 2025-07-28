const express = require('express');
const bodyParser = require('body-parser');
const conn = require('./db');
const app = express();
const port = 3000;
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
// Login handler using login_details table
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM login_details WHERE username = ? AND password = ?';
    conn.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.send('Error checking credentials.');
        }
        if (results.length > 0) {
            res.send(`
            <html>
            <head><title>Login</title></head>
            <body>
            <h2> Welcome, ${username}!</h2>
            </body>
            </html>
            `);
        } else {
            res.send(' Invalid username or password.');
        }
    });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});