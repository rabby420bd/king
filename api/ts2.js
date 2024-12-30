const axios = require('axios');

const ts2 = async (req, res) => {
    try {
        const url = 'https://raw.githubusercontent.com/byte-capsule/TSports-m3u8-Grabber/main/NS_Player_Tsports_live.m3u';
        const response = await axios.get(url);

        console.log('Fetched Data:', response.data); // Log raw data for debugging

        const data = response.data;

        // Check if it's plain text or JSON
        let cookie;
        if (typeof data === 'string') {
            // Extract cookie from plain text
            const match = data.match(/cookie=(.*)/);
            cookie = match ? match[1].trim() : null;
        } else if (typeof data === 'object') {
            // Handle JSON structure
            cookie = data[0]?.cookie;
        }

        if (!cookie) {
            console.error('Cookie extraction failed:', data);
            return res.status(500).json({ error: 'Unable to extract cookie' });
        }

        const streamUrl = `https://live-cdn.tsports.com/live-02/index.m3u8?|cookie=${cookie}`;
        res.json({ streamUrl });
    } catch (error) {
        console.error('Error fetching or processing data:', error.message);
        res.status(500).json({ error: 'Failed to process request' });
    }
};

module.exports = ts2;
