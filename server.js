require('dotenv').config();
const apiKey = process.env.API_KEY;
const express = require('express');
const path = require('path');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');

const app = express();
const PORT = 3000;

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// New endpoint: fetch weather data securely from backend
app.get('/weather-data', async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// 🔧 Serve static files from the 'Weatherapp' folder
const staticPath = path.join(__dirname, 'Weatherapp');

// 1. Start livereload server watching the static folder
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(staticPath);

// 2. Inject livereload script into served HTML
app.use(connectLivereload());

// 3. Serve static files from 'Weatherapp'
app.use(express.static(staticPath));

// 4. Fallback to index.html for SPA routes
app.get(/^\/(?!.*\.).*$/, (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

// 5. Notify browser on file changes
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
