const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'root', // Replace with your MySQL password
  database: 'contactdb',// Replace with your database name
  port:3306 // Specify the port if it's not the default (3306)
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the MySQL database as ID.', db.threadId);
});

// Defined a route for handling form submissions
app.post('/api/contact', (req, res) => {
  const { firstname, lastname, contactnumber, email, country, subject } = req.body;

  const query = 'INSERT INTO contacts (first_name, last_name, contact_number, email, country, subject) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [firstname, lastname, contactnumber, email, country, subject], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Error storing data in the database.');
    }
    res.status(201).send('Form data stored successfully!');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
