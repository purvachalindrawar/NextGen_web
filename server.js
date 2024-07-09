const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Configure MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Purv@19205',
    database: 'next'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve the HTML form from the 'public' directory

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { name, Last_name, Coun, subject } = req.body;

    const sql = 'INSERT INTO next_table (name, Last_name, Coun, message) VALUES (?, ?, ?, ?)';
    const values = [name, Last_name, Coun, subject];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Data saved successfully!' });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
