import fetch from 'node-fetch';

const ts1 = async (req, res) => {
  try {
    const response = await fetch("https://raw.githubusercontent.com/byte-capsule/TSports-m3u8-Grabber/main/NS_Player_Tsports_live.m3u");
    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch data from the external source" });
    }

    const data = await response.json();
    if (!Array.isArray(data) || !data[0]?.cookie) {
      return res.status(404).json({ error: "Cookie not found in the data" });
    }

    const m3u8Url = `https://live-cdn.tsports.com/live-01/index.m3u8?|cookie=${data[0].cookie}`;
    res.json({ url: m3u8Url });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default ts1;
