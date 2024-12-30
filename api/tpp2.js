const axios = require('axios');

const fetchM3U8 = async (req, res) => {
    try {
        const apiResponse = await axios.get('https://kingicharles.vercel.app/api/ts2', {
            headers: {
                'Referrer': 'https://live-cdn.tsports.com',
                'Origin': 'https://live-cdn.tsports.com',
                'User-Agent': 'Tsports (Linux; Telegram:https://t.me/J_9X_H_9X_N) Github:https://github.com/byte-capsule AndroidXMedia3/1.1.1/64103898/4d2ec9b8c7534adc'
            }
        });

        const streamUrl = apiResponse.data?.streamUrl;

        if (!streamUrl) {
            console.error('Stream URL not found');
            return res.status(400).send('Stream URL not found in API response');
        }

        console.log('Stream URL:', streamUrl);

        // Fetch M3U8 content
        const m3u8Response = await axios.get(streamUrl, {
            headers: {
                'Referrer': 'https://live-cdn.tsports.com',
                'Origin': 'https://live-cdn.tsports.com',
                'User-Agent': 'Tsports (Linux; Telegram:https://t.me/J_9X_H_9X_N) Github:https://github.com/byte-capsule AndroidXMedia3/1.1.1/64103898/4d2ec9b8c7534adc'
            }
        });

        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        res.send(m3u8Response.data);
    } catch (error) {
        console.error('Error fetching M3U8:', error.response?.status, error.response?.data);
        res.status(500).send(`Error fetching M3U8 data: ${error.message}`);
    }
};

module.exports = fetchM3U8;
