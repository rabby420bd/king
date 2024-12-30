const axios = require('axios');

// Define the API endpoint to fetch the JSON data
const apiUrl = 'https://kingicharles.vercel.app/api/ts2';

// Define the custom headers for both requests
const headers = {
  'Referrer': 'https://live-cdn.tsports.com',
  'Origin': 'https://live-cdn.tsports.com',
  'User-Agent': 'Tsports (Linux; Telegram:https://t.me/J_9X_H_9X_N) Github:https://github.com/byte-capsule AndroidXMedia3/1.1.1/64103898/4d2ec9b8c7534adc'
};

// Function to fetch the M3U8 link from the JSON API and then fetch the M3U8 content
const fetchM3U8 = async (req, res) => {
  try {
    // Step 1: Fetch the JSON data to get the M3U8 link
    const apiResponse = await axios.get(apiUrl, { headers });
    const streamUrl = apiResponse.data?.data?.streamUrl;

    if (!streamUrl) {
      return res.status(400).send('M3U8 URL not found in API response');
    }

    // Step 2: Fetch the M3U8 content from the stream URL
    const m3u8Response = await axios.get(streamUrl, { headers });

    // Step 3: Send the M3U8 content as the response
    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.send(m3u8Response.data);
  } catch (error) {
    // Handle any errors and send a response
    console.error('Error fetching M3U8:', error.message);
    res.status(500).send('Error fetching M3U8 data');
  }
};

// Export the function to be used in index.js
module.exports = fetchM3U8;
