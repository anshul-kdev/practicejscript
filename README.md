
# practicejscript

Welcome to the **practicejscript** monorepo! This repository is designed to host multiple JavaScript/Node.js web applications, each in its own folder. You can easily add new apps and keep everything organized in one place.

---

## 📁 Project Structure

```
practicejscript/
│
├── .env                # Environment variables (not committed)
├── .gitignore          # Git ignore rules
├── package.json        # Project dependencies and scripts
├── README.md           # This documentation
├── server.js           # Main backend server (serves all apps)
├── Weatherapp/         # Example app: Weather search UI
│   ├── index.html
│   ├── practice.js
│   └── assets/         # (Optional) images, icons, etc.
├── AnotherApp/         # (Add more apps here in the future)
│   └── ...
└── ...
```

---

## 🚀 Getting Started

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd practicejscript
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure API keys and environment variables:**
   - Create a `.env` file in the root directory (see `.env.example` if available).
   - Example for Weatherapp:
     ```
     API_KEY=your_openweathermap_api_key
     ```

4. **Start the server:**
   ```sh
   node server.js
   ```
   The server will serve all apps in their respective folders. By default, open [http://localhost:3000](http://localhost:3000) for the main app.

---

## 🌦️ Weatherapp

**Weatherapp** is a modern weather search web app with animated UI and live reload for development.

- **Features:**
  - Search weather by city (OpenWeatherMap API)
  - Animated gradients and icons
  - Responsive design
  - API key is kept secure on the backend

- **Usage:**
  1. Enter a city name and click search.
  2. View current weather, temperature, and animated icon.

---

## ➕ Adding More Apps

To add a new app:

1. Create a new folder in the root directory (e.g., `MyNewApp/`).
2. Add your app's files (HTML, JS, CSS, assets, etc.) inside that folder.
3. Update `server.js` if you want to add custom backend routes for your new app.
4. Document your app in this README under a new section (see Weatherapp as an example).

---

## 🛡️ Security & Best Practices

- **Never commit secrets** (API keys, passwords) to the repo. Use `.env` for sensitive data.
- **Validate user input** on the backend for all API endpoints.
- **Keep dependencies updated** to avoid vulnerabilities.
- **Add rate limiting** for public APIs if needed.

---

## 📄 License

MIT

---

## 🙏 Credits

- [OpenWeatherMap API](https://openweathermap.org/api)
- [Tailwind CSS](https://tailwindcss.com/)
- [Material Symbols](https://fonts.google.com/icons)

---

*This monorepo is designed for easy expansion. Add more apps and keep your JavaScript projects organized!*