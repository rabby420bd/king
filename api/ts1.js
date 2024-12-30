const axios = require('axios');

const ts1 = async (req, res) => {
    try {
        const url = 'https://raw.githubusercontent.com/byte-capsule/TSports-m3u8-Grabber/main/NS_Player_Tsports_live.m3u';

        // Set custom headers to bypass CORS
        const headers = {
            "Origin": "https://live-cdn.tsports.com",
            "Referer": "https://live-cdn.tsports.com",
            "User-Agent": "Tsports (Linux; Telegram:https://t.me/J_9X_H_9X_N) Github:https://github.com/byte-capsule AndroidXMedia3/1.1.1/64103898/4d2ec9b8c7534adc"
        };

        const response = await axios.get(url, { headers });

        console.log('Fetched Data:', response.data); // Log raw data for debugging

        const data = response.data;

        // Extract the cookie
        const match = data.match(/cookie=(.*)/);
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
