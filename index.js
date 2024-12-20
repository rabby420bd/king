const express = require('express');
const path = require('path');
const timingsByCity = require('./api/timingsByCity');
const emergencyBalance = require('./api/emergencyBalance');
const nagadhalf = require('./api/nagadhalf');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the homepage (index.html) as the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the BL Loan Info page (blloan.html)
app.get('/blloan', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blloan.html'));
});

// Serve the Live TV page (livetv.html)
app.get('/livetv', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'livetv.html'));
});

// Serve the Toffe TV page (toffee.html)
app.get('/toffee', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'toffee.html'));
});

// API routes
app.get('/api/timingsByCity', timingsByCity);
app.get('/api/emergency-balance', emergencyBalance);
app.get('/api/nagadhalf', nagadhalf);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
