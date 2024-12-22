const express = require('express');
const path = require('path');

// API imports
const namaz = require('./api/namaz');
const emergencyBalance = require('./api/emergencyBalance');
const nagadUserStatus = require('./api/nagadhalf');
const proxyTsports = require('./api/proxyTsports'); // If you choose proxy method

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

// Serve the tsports.m3u8 file statically (if placed in 'public' folder)
app.get('/tsports.m3u8', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'tsports.m3u8'));
});

// Alternatively, use a proxy method to fetch the M3U8 file dynamically (if you want to proxy from another URL)
// app.get('/tsports.m3u8', proxyTsports);  // Uncomment this line if you prefer proxying instead

// API routes
app.get('/api/namaz', namaz);
app.get('/api/emergency-balance', emergencyBalance);
app.get('/api/nagadhalf', nagadUserStatus);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
