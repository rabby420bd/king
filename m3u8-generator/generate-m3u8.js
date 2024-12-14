const fs = require('fs');

// Channel data for one channel (example: T Sports Live 03)
const channel = {
  name: "T Sports Live 03",
  logo: "https://image.tsports.com/images/contents/thumbnail/774/mobile_logo_LIVE_6506adba5876a.jpg",
  link: "https://live-cdn.tsports.com/live-03/playlist.m3u8",
  headers: {
    "Cookie": "Edge-Cache-Cookie=URLPrefix=aHR0cHM6Ly9saXZlLWNkbi50c3BvcnRzLmNvbS8:Expires=1734251896:KeyName=tsports-ed25519-01:Signature=OwdpHcnUmZFfpTE8mYvJ7vcBSvIUiZBw-BT6XdxckYxYKq0DkufZ5_bZTtWqL0blgrdGmVkvpyfxQ0M05-5MAg",
    "Host": "live-cdn.tsports.com",
    "User-agent": "https://github.com/byte-capsule (Linux;Android 14)"
  }
};

// Generate M3U8 content for one channel
let m3uContent = '#EXTM3U\n';
m3uContent += `#EXTINF:-1 tvg-logo="${channel.logo}",${channel.name}\n`;
m3uContent += `#EXTVLCOPT:http-user-agent=${channel.headers['User-agent']}\n`;
m3uContent += `#EXTVLCOPT:http-cookie=${channel.headers['Cookie']}\n`;
m3uContent += `${channel.link}\n`;

// Write to channel.m3u8
fs.writeFileSync('channel.m3u8', m3uContent);

console.log('M3U8 file generated: channel.m3u8');
