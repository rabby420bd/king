import fetch from "node-fetch";

export default async function handler(req, res) {
    const { url, origin, referer, userAgent, cookie } = req.query;

    if (!url) {
        return res.status(400).json({ error: "Missing URL parameter" });
    }

    try {
        // Fetch the stream with custom headers
        const response = await fetch(url, {
            headers: {
                "Origin": origin,
                "Referer": referer,
                "User-Agent": userAgent,
                "Cookie": cookie
            }
        });

        if (!response.ok) {
            return res.status(response.status).send(`Error: ${response.statusText}`);
        }

        // Pass the stream data to the client
        res.setHeader("Content-Type", response.headers.get("content-type") || "application/octet-stream");
        response.body.pipe(res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
