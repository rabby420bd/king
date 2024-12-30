const fetch = require("node-fetch");

const ts1 = async (req, res) => {
  try {
    // Fetch the JSON data from the given URL
    const response = await fetch("https://raw.githubusercontent.com/byte-capsule/TSports-m3u8-Grabber/main/NS_Player_Tsports_live.m3u");

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch data from the external source" });
    }

    // Parse JSON data
    const data = await response.json();

    // Extract cookie from the data
    if (!Array.isArray(data) || !data[0]?.cookie) {
      return res.status(404).json({ error: "Cookie not found in the data" });
    }
    const cookie = data[0].cookie;

    // Construct the m3u8 URL
    const m3u8Url = `https://live-cdn.tsports.com/live-01/index.m3u8?|cookie=${cookie}`;

    // Send the URL in response
    res.json({ url: m3u8Url });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = ts1;
