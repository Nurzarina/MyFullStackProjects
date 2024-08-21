const express = require("express"); // Import express for server functionality
const mysql = require("mysql"); // Import mysql for database connectivity
const cors = require("cors"); // Import cors for Cross-Origin Resource Sharing
const app = express(); // Create an instance of the express application
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Middleware to enable CORS

// Create a MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sLHCkPEkpNsCwRnQVVRx0dNxjRufQY",
    database: "mysqltask3"
});

// Route to get all students
app.get("/", (req, res) => {
    const sql = "SELECT * FROM student"; // SQL query to fetch all students
    db.query(sql, (err, data) => { // Execute the query
        if (err) {
            res.json(err); // Send error response if query fails
        } else {
            res.send(data); // Send the retrieved data
        }
    })
});

// Route to create a new student
app.post("/create", (req, res) => {
    const sql = "INSERT INTO student(name,email,marks,grade,city) VALUES (?)"; // SQL query to insert a new student
    const values = [
        req.body.name,      // Get name from request body
        req.body.email,     // Get email from request body
        req.body.marks,     // Get marks from request body
        req.body.grade,     // Get grade from request body
        req.body.city       // Get city from request body
    ]
    db.query(sql, [values], (err, data) => { // Execute the query
        if (err) {
            res.json(err); // Send error response if query fails
        } else {
            res.json(data); // Send success response with data
        }
    })
});

// Route to update an existing student
app.put("/update/:id", (req, res) => {
    const sql = "UPDATE student SET `name` = ?, `email` = ?, `marks` = ?, `grade` = ?, `city` = ? WHERE id = ?"; // SQL query to update student details
    const values = [
        req.body.name,      // Get name from request body
        req.body.email,     // Get email from request body
        req.body.marks,     // Get marks from request body
        req.body.grade,     // Get grade from request body
        req.body.city       // Get city from request body
    ]
    const id = req.params.id // Get student ID from route parameters
    db.query(sql, [...values, id], (err, data) => { // Execute the query
        if (err) {
            res.json(err); // Send error response if query fails
        } else {
            res.json(data); // Send success response with data
        }
    })
});

// Route to delete a student
app.delete("/student/:id", (req, res) => {
    const sql = "DELETE FROM student WHERE id = ?"; // SQL query to delete a student
    const id = req.params.id // Get student ID from route parameters
    db.query(sql, [id], (err, data) => { // Execute the query
        if (err) {
            res.json(err); // Send error response if query fails
        } else {
            res.json(data); // Send success response with data
        }
    })
});

// Start the server
app.listen(5000, () => {
    console.log("Server started on port 5000"); // Log server start message
});


