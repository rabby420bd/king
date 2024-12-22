const express = require('express');
const request = require('request');

const app = express();

// Proxy the M3U8 file
app.get('/tsports.m3u8', (req, res) => {
    const url = 'http://103.96.235.18:8080/sports1/index.m3u8';
    request(url).pipe(res);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
