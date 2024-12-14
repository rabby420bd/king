const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs'); // For file system operations
const app = express();

app.get('/generate-m3u8', async (req, res) => {
  const url = 'https://live-cdn.tsports.com/live-03/playlist.m3u8'; // M3U8 URL
  const headers = {
    "Cookie": "Edge-Cache-Cookie=URLPrefix=aHR0cHM6Ly9saXZlLWNkbi50c3BvcnRzLmNvbS8:Expires=1734251896:KeyName=tsports-ed25519-01:Signature=OwdpHcnUmZFfpTE8mYvJ7vcBSvIUiZBw-BT6XdxckYxYKq0DkufZ5_bZTtWqL0blgrdGmVkvpyfxQ0M05-5MAg",
    "User-agent": "https://github.com/byte-capsule (Linux;Android 14)",
    "Host": "live-cdn.tsports.com"
  };

  try {
    // Fetch the M3U8 content
    const response = await fetch(url, { method: 'GET', headers });
    const m3u8Data = await response.text();

    // Save the M3U8 file locally
    const filePath = './output.m3u8';
    fs.writeFileSync(filePath, m3u8Data, 'utf8');

    // Respond with a success message and the saved file path
    res.send({ message: 'M3U8 file generated successfully!', filePath });
  } catch (error) {
    console.error('Error fetching M3U8:', error);
    res.status(500).send({ error: 'Failed to generate M3U8 file' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
