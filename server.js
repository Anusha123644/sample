const express = require('express');
const bodyParser = require('body-parser');
const conn = require('./db');
const app = express();
const port = 3000;
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
// Handle POST from form
app.post('/create', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.send('Name and Email are required!');
    }
    const sql = 'INSERT INTO user_details (name, email) VALUES (?, ?)';
    conn.query(sql, [name, email], (err, result) => {
        if (err) {
            console.error('Error:', err);
            return res.send('Error saving user.');
        }
        console.log('Saved user ID:', result.insertId);
        res.send('User saved successfully!');
    });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

