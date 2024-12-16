const express = require('express');
const timingsByCity = require('./api/timingsByCity');

const app = express();
const port = process.env.PORT || 3000;

// Define API routes
app.get('/api/timingsByCity', timingsByCity);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
