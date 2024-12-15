import fetch from "node-fetch";

export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        res.status(400).json({ error: "Missing URL parameter" });
        return;
    }

    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Tsports (Linux; Telegram:https://t.me/J_9X_H_9X_N)",
                "Cookie": "Edge-Cache-Cookie=URLPrefix=aHR0cHM6Ly9saXZlLWNkbi50c3BvcnRzLmNvbS8:Expires=1734299449:KeyName=tsports-ed25519-01:Signature=lzdxVFwP1u5qpcbfobX1spIIO73v7i3wywq_JDWK-q68ud8nYsuTlvkcCGHJnFKNZn2KQTyk807AfrgLH9OuAg"
            }
        });

        if (!response.ok) {
            res.status(response.status).json({ error: "Failed to fetch stream" });
            return;
        }

        // Stream video back to the client
        res.setHeader("Content-Type", "application/x-mpegURL");
        response.body.pipe(res);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
