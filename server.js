import express from 'express';
import registerRoutes from './api/route.js';

async function init() {
  const app = express();

  app.get("/", (req, res) => {
    res.json({ message: "API" });
  });

  registerRoutes(app);

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log("server running on port " + port);
  });
}

init();
