const express = require('express');
const timingsByCity = require('./api/timingsByCity'); // Import the API logic

const app = express();
const port = process.env.PORT || 3000;

// Route for the prayer timings API
app.get('/api/timingsByCity', timingsByCity);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
