const express = require('express');
const app = express();

// Middleware 1: Logging
const loggerMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass control to the next middleware function
};

// Middleware 2: Authentication
const authMiddleware = (req, res, next) => {
  const isAuthenticated = true; // Simulate authentication
  if (isAuthenticated) {
    next(); // Pass control to the next middleware function
  } else {
    res.status(401).send('Unauthorized');
  }
};

// Middleware 3: Data Processing
const dataProcessingMiddleware = (req, res, next) => {
  req.processedData = { message: 'Data processed' };
  next(); // Pass control to the next middleware function
};

// Route handler
app.get('/data', loggerMiddleware, authMiddleware, dataProcessingMiddleware, (req, res) => {
  res.send(req.processedData);
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
