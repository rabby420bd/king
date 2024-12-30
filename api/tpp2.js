const axios = require('axios');

// Define the URL for the M3U8 file
const url = 'https://kingicharles.vercel.app/api/tp2';

// Define the custom headers
const headers = {
  'Referrer': 'https://live-cdn.tsports.com',
  'Origin': 'https://live-cdn.tsports.com',
  'User-Agent': 'Tsports (Linux; Telegram:https://t.me/J_9X_H_9X_N) Github:https://github.com/byte-capsule AndroidXMedia3/1.1.1/64103898/4d2ec9b8c7534adc'
};

// Function to fetch the redirected M3U8 file with headers
const fetchM3U8 = async (req, res) => {
  try {
    // Make a GET request to fetch the redirected M3U8 content
    const response = await axios.get(url, {
      headers,
      maxRedirects: 5 // Follow up to 5 redirects
    });

    // Send the M3U8 content as the response
    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.send(response.data);
  } catch (error) {
    // Handle any errors and send a response
    console.error('Error fetching M3U8:', error.message);
    res.status(500).send('Error fetching M3U8 data');
  }
};

// Export the function to be used in index.js
module.exports = fetchM3U8;
