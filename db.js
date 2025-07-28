const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: "localhost",
    user: "root", // Change if needed
    password: "personal@2002", // Your MySQL password
    database: "db1"
});
conn.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL! db1");
});
module.exports = conn;