import fetch from "node-fetch";

export default async function handler(req, res) {
    const targetUrl = "https://raw.githubusercontent.com/byte-capsule/TSports-m3u8-Grabber/main/NS_Player_Tsports_live.m3u";

    try {
        const response = await fetch(targetUrl);
        if (!response.ok) {
            res.status(response.status).json({ error: "Failed to fetch data" });
            return;
        }

        // Attach authentication headers for video streaming
        const data = await response.json();
        const updatedData = data.map(item => ({
            ...item,
            link: `/api/stream?url=${encodeURIComponent(item.link)}`, // Redirect video stream through a proxy
        }));

        res.status(200).json(updatedData);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
