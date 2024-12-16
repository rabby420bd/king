const express = require("express");
const apiRoutes = require("./api");

const app = express();

// Middleware for parsing JSON (if needed)
app.use(express.json());

// Use all API routes from the api folder
app.use("/api", apiRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
