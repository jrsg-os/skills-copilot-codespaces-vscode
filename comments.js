// Create web server to serve the comments.json file
// and to add new comments to it

// Import necessary modules
const express = require("express");
const fs = require("fs");
const path = require("path");

// Create an express app
const app = express();

// Set the port number
const port = 3000;

// Set the path to the comments.json file
const commentsPath = path.join(__dirname, "comments.json");

// Middleware to parse JSON data
app.use(express.json());

// GET request handler for /comments
app.get("/comments", (req, res) => {
  // Read the comments.json file
  fs.readFile(commentsPath, (err, data) => {
    if (err) {
      res.status(500).send("Error reading comments");
      return;
    }

    // Send the comments data as a response
    res.json(JSON.parse(data));
  });
});

// POST request handler for /comments
app.post("/comments", (req, res) => {
  // Read the comments.json file
  fs.readFile(commentsPath, (err, data) => {
    if (err) {
      res.status(500).send("Error reading comments");
      return;
    }

    // Parse the comments data
    const comments = JSON.parse(data);

    // Add the new comment to the comments array
    comments.push(req.body);

    // Write the updated comments data back to the file
    fs.writeFile(commentsPath, JSON.stringify(comments, null, 2), (err) => {
      if (err) {
        res.status(500).send("Error writing comments");
        return;
      }

      // Send a success response
      res.status(201).send("Comment added successfully");
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
// End of comments.js