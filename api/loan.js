const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Endpoint to handle phone number validation and API requests
app.get('/api/emergency-balance', async (req, res) => {
    const phoneNumber = req.query.phone;

    // Validate phone number: must start with '014' or '019' and be 11 digits long
    const validPhoneRegex = /^(014|019)\d{8}$/;

    if (!phoneNumber || !validPhoneRegex.test(phoneNumber)) {
        return res.status(400).json({ error: 'Use only Banglalink number' });
    }

    try {
        // API endpoint
        const apiUrl = 'https://myblapi.banglalink.net/api/v1/emergency-balance/';
        const fullUrl = `${apiUrl}${encodeURIComponent(phoneNumber)}`;

        // Make the API request
        const response = await axios.get(fullUrl);

        // Send the API response back to the client
        res.json(response.data);
    } catch (error) {
        // Handle errors from the API request
        res.status(500).json({ error: 'Error making API request', details: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
