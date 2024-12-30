const express = require('express');
const path = require('path');

// API imports
const ts1 = require('./api/ts1');
const emergencyBalance = require('./api/emergencyBalance');
const namaz = require('./api/namaz');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the homepage (index.html) as the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve other HTML files
const staticPages = ['blloan', 'livetv', 'toffee'];
staticPages.forEach((page) => {
    app.get(`/${page}`, (req, res) => {
        res.sendFile(path.join(__dirname, 'public', `${page}.html`));
    });
});

// API routes
app.get('/api/ts1', ts1);
app.get('/api/emergency-balance', emergencyBalance);
app.get('/api/namaz', namaz);

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Handle 404 for unmatched routes
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
