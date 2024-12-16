const express = require("express");
const request = require("request");

const app = express();
const PORT = 3000;

// Proxy endpoint for the video stream
app.get("/stream", (req, res) => {
    const streamUrl = req.query.url; // Pass the URL dynamically as a query parameter
    const headers = {
        "Origin": req.query.origin,
        "Referer": req.query.referer,
        "User-Agent": req.query.userAgent,
        "Cookie": req.query.cookie
    };

    // Fetch the video stream with headers
    request({ url: streamUrl, headers }).pipe(res).on("error", (err) => {
        res.status(500).send("Error fetching stream: " + err.message);
    });
});

// Serve the static HTML
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
