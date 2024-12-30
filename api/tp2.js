// api/ts1.js
const axios = require('axios');

module.exports = async (req, res) => {
    try {
        // Fetch the JSON result from the provided API
        const response = await axios.get('https://kingicharles.onrender.com/api/ts2');
        
        // Extract the stream URL from the JSON response
        const streamUrl = response.data.streamUrl;
        
        // Redirect to the stream URL
        res.redirect(streamUrl);
    } catch (error) {
        console.error('Error fetching stream URL:', error);
        res.status(500).send('Internal Server Error');
    }
};
