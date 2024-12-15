import fetch from "node-fetch";

export default async function handler(req, res) {
    const url = "https://raw.githubusercontent.com/byte-capsule/TSports-m3u8-Grabber/main/NS_Player_Tsports_live.m3u";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            return res.status(response.status).json({ error: "Failed to fetch data" });
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}
