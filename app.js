import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamic route loader
const apiFolderPath = path.join(__dirname, "api");
fs.readdirSync(apiFolderPath).forEach(async (file) => {
  if (file.endsWith(".js")) {
    const route = (await import(path.join(apiFolderPath, file))).default;
    const routePath = `/api/${file.replace(".js", "")}`;
    app.use(routePath, route);
    console.log(`Loaded route: ${routePath}`);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
