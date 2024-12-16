const express = require('express');
const timingsByCity = require('./api/timingsByCity'); // Import timingsByCity logic
const emergencyBalance = require('./api/emergencyBalance'); // Import emergencyBalance logic

const app = express();
const port = process.env.PORT || 3000;

// Route for the prayer timings API
app.get('/api/timingsByCity', timingsByCity);

// Route for the emergency balance API
app.get('/api/emergency-balance', emergencyBalance);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
