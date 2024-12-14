const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/stream', async (req, res) => {
  const url = https://live-cdn.tsports.com/live-03/playlist.m3u8;  // M3U8 URL passed as query parameter
  const headers = {
    "Cookie": "Edge-Cache-Cookie=URLPrefix=aHR0cHM6Ly9saXZlLWNkbi50c3BvcnRzLmNvbS8:Expires=1734251896:KeyName=tsports-ed25519-01:Signature=OwdpHcnUmZFfpTE8mYvJ7vcBSvIUiZBw-BT6XdxckYxYKq0DkufZ5_bZTtWqL0blgrdGmVkvpyfxQ0M05-5MAg",
    "User-agent": "https://github.com/byte-capsule (Linux;Android 14)",
    "Host": "live-cdn.tsports.com"
  };

  const response = await fetch(url, { method: 'GET', headers });
  const body = await response.text();
  
  res.send(body);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
