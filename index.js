// index.js
const express = require('express');
const path = require('path');

// API imports
const namaz = require('./api/namaz');
const emergencyBalance = require('./api/emergencyBalance');
const ts1 = require('./api/ts1');  // Keep ts1.js
const tp1 = require('./api/tp1');  // New tp1.js

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the homepage (index.html) as the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve other HTML files
app.get('/blloan', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blloan.html'));
});

app.get('/livetv', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'livetv.html'));
});

app.get('/toffee', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'toffee.html'));
});

// API routes
app.get('/api/namaz', namaz);
app.get('/api/emergency-balance', emergencyBalance);
app.get('/api/ts1', ts1);  // Keep the old ts1 route
app.get('/api/tp1', tp1);  // New tp1 route

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
