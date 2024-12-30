const axios = require('axios');

const ts1 = async (req, res) => {
    try {
        const url = 'https://raw.githubusercontent.com/byte-capsule/TSports-m3u8-Grabber/main/NS_Player_Tsports_live.m3u';
        const response = await axios.get(url);

        // Log the data for debugging
        console.log('Fetched Data:', response.data);

        const data = response.data;

        // Adjust regex or parsing logic based on actual response
        const match = data.match(/cookie=(.*)/); // Adjust if necessary
        const cookie = match ? match[1].trim() : null;

        if (!cookie) {
            console.error('Cookie extraction failed:', data);
            return res.status(500).json({ error: 'Unable to extract cookie' });
        }

        const streamUrl = `https://live-cdn.tsports.com/live-01/index.m3u8?|cookie=${cookie}`;
        res.json({ streamUrl });
    } catch (error) {
        console.error('Error fetching or processing data:', error.message);
        res.status(500).json({ error: 'Failed to process request' });
    }
};

module.exports = ts1;
