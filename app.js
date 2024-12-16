const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// Middleware to parse JSON (if needed)
app.use(express.json());

// Dynamically load all API routes from the "api" folder
const apiFolderPath = path.join(__dirname, "api");
fs.readdirSync(apiFolderPath).forEach((file) => {
  if (file.endsWith(".js")) {
    const route = require(path.join(apiFolderPath, file));
    const routePath = `/api/${file.replace(".js", "")}`; // e.g., timings.js => /api/timings
    app.use(routePath, route);
    console.log(`Loaded route: ${routePath}`);
  }
});

// Default route for invalid API paths
app.use((req, res) => {
  res.status(404).json({ error: "API route not found." });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
