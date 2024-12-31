const axios = require('axios');

const fetchM3U8 = async (req, res) => {
    try {
        // Step 1: Fetch JSON to get the streamUrl
        const apiResponse = await axios.get('https://kingicharles.vercel.app/api/ts2', {
            headers: {
                'Referrer': 'https://live-cdn.tsports.com',
                'Origin': 'https://live-cdn.tsports.com',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const streamUrl = apiResponse.data?.streamUrl;

        if (!streamUrl) {
            console.error('Stream URL not found in API response');
            return res.status(400).send('Stream URL not found in API response');
        }

        console.log('Stream URL:', streamUrl);

        // Extract cookie if available
        const [url, cookieParam] = streamUrl.split('|cookie=');
        const cookie = cookieParam ? cookieParam.split('=')[1] : '';

        // Step 2: Fetch M3U8 file from the streamUrl
        const m3u8Response = await axios.get(url, {
            headers: {
                'Referrer': 'https://live-cdn.tsports.com',
                'Origin': 'https://live-cdn.tsports.com',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': '*/*',
                'Connection': 'keep-alive',
                'Cookie': `Edge-Cache-Cookie=${cookie}`
            },
            responseType: 'stream'
        });

        // Step 3: Set appropriate content type and stream the response
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        m3u8Response.data.pipe(res);
    } catch (error) {
        console.error('Error fetching M3U8:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
        res.status(500).send(`Error fetching M3U8 data: ${error.message}`);
    }
};

module.exports = fetchM3U8;
