const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv'); //import dotenv

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a connection pool to the database (for better scalability)
const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER, // Default fallback user
  password: process.env.MYSQL_PASSWORD, // Default fallback password
  database: process.env.MYSQL_DB, // Default fallback database
  port: 3306,
  connectionLimit: 10, // Maximum number of connections in the pool
});

// Initialize the database table (if not exists)
const initDb = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      contact_number VARCHAR(15) NOT NULL,
      email VARCHAR(100) NOT NULL,
      country VARCHAR(50) NOT NULL,
      subject TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;
  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating table:', err);
      return;
    }
    console.log('Contacts table initialized (if not exists).');
  });
};

// Call the function to initialize the database when the server starts
initDb();

// Route to handle form submissions
app.post('/api/contact', (req, res) => {
  const { firstname, lastname, contactnumber, email, country, subject } = req.body;

  const query = `
    INSERT INTO contacts (first_name, last_name, contact_number, email, country, subject)
    VALUES (?, ?, ?, ?, ?, ?);
  `;
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
