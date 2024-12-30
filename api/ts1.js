const axios = require('axios');

// Fetch and process the API data
const ts1 = async (req, res) => {
    try {
        // Fetch JSON data from the provided URL
        const url = 'https://raw.githubusercontent.com/byte-capsule/TSports-m3u8-Grabber/main/NS_Player_Tsports_live.m3u';
        const response = await axios.get(url);

        // Parse the data to extract the cookie
        const data = response.data;

        // Assuming the data starts with a cookie declaration, like:
        // data[0].cookie
        const match = data.match(/cookie=(.*)/);
        const cookie = match ? match[1].trim() : null;

        if (!cookie) {
            return res.status(500).json({ error: 'Unable to extract cookie' });
        }

        // Build the API response
        const streamUrl = `https://live-cdn.tsports.com/live-01/index.m3u8?|cookie=${cookie}`;
        res.json({ streamUrl });
    } catch (error) {
        console.error('Error fetching or processing data:', error.message);
        res.status(500).json({ error: 'Failed to process request' });
    }
};

module.exports = ts1;
