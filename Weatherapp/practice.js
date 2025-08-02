let apiKey = null;

// Fetch the API key once on load
fetch('/weather-key')
    .then(response => response.json())
    .then(data => {
        apiKey = data.apiKey;
    });

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;
const searchBtn = document.getElementById("searchBtn");
const city = document.getElementById("city");
const cityNameElem = document.getElementById("cityname");
const tempElem = document.getElementById("temp");
const iconElem = document.getElementById("icon");

function showLoading() {
    cityNameElem.innerHTML = `
        <span style="display:inline-block;position:relative;">
            <span class="loading-shimmer" style="font-size:1.5rem; font-weight:bold; color:#fff;">
                Loading weather...
            </span>
        </span>
    `;
    tempElem.innerHTML = "";
    iconElem.innerHTML = `
        <span style="display:inline-block;position:relative;width:70px;height:60px;">
            <svg width="70" height="60" viewBox="0 0 70 60" fill="none">
                <ellipse cx="35" cy="35" rx="25" ry="15" fill="#60a5fa">
                    <animate attributeName="cx" values="35;40;35" dur="1.2s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="50" cy="30" rx="15" ry="10" fill="#3b82f6" opacity="0.7">
                    <animate attributeName="cx" values="50;55;50" dur="1.2s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="25" cy="30" rx="12" ry="8" fill="#93c5fd" opacity="0.8">
                    <animate attributeName="cx" values="25;20;25" dur="1.2s" repeatCount="indefinite"/>
                </ellipse>
                <!-- Raindrops -->
                <rect x="32" y="48" width="4" height="10" rx="2" fill="#38bdf8">
                    <animate attributeName="y" values="48;55;48" dur="0.8s" repeatCount="indefinite"/>
                </rect>
                <rect x="40" y="50" width="4" height="10" rx="2" fill="#0ea5e9" opacity="0.7">
                    <animate attributeName="y" values="50;57;50" dur="1s" repeatCount="indefinite"/>
                </rect>
            </svg>
        </span>
    `;
}

// Add shimmer effect CSS (injects once)
if (!document.getElementById('shimmer-style')) {
    const style = document.createElement('style');
    style.id = 'shimmer-style';
    style.innerHTML = `
    .loading-shimmer {
        background: linear-gradient(90deg, #e0e7ef 25%, #f3f4f6 50%, #e0e7ef 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite linear;
        color: transparent !important;
        background-clip: text;
        -webkit-background-clip: text;
    }
    @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }
    `;
    document.head.appendChild(style);
}

// Helper to get gradient colors based on weather
function getCursorGradientColors(weatherMain) {
    switch (weatherMain) {
        case "Clear":
            return [
                "rgba(253,224,71,0.45)", // yellow-300
                "rgba(251,191,36,0.32)", // yellow-400
                "rgba(255,255,255,0.10)"
            ];
        case "Clouds":
            return [
                "rgba(156,163,175,0.35)", // gray-400
                "rgba(107,114,128,0.22)", // gray-500
                "rgba(255,255,255,0.10)"
            ];
        case "Rain":
            return [
                "rgba(56,189,248,0.40)", // sky-400
                "rgba(59,130,246,0.28)", // blue-500
                "rgba(255,255,255,0.10)"
            ];
        case "Snow":
            return [
                "rgba(203,213,225,0.45)", // slate-200
                "rgba(148,163,184,0.25)", // slate-400
                "rgba(255,255,255,0.20)"
            ];
        default:
            return [
                "rgba(99,102,241,0.35)", // indigo-500
                "rgba(59,130,246,0.22)", // blue-500
                "rgba(255,255,255,0.10)"
            ];
    }
}

// Track current weather for gradient
let currentWeatherMain = null;

// Update currentWeatherMain in checkweather
async function checkweather(cityValue){
    showLoading();

    // Wait until apiKey is loaded
    if (!apiKey) {
        cityNameElem.innerHTML = "Loading API key...";
        return;
    }

    try {
        const weather = await fetch(apiUrl + cityValue + `&appid=${apiKey}&units=metric`);
        const data = await weather.json();
        if(weather.status == 404 || data.cod == "404"){
            cityNameElem.innerHTML = "City not found";
            tempElem.innerHTML = "";
            iconElem.innerHTML = `<span class="material-symbols-outlined text-5xl">error</span>`;
            currentWeatherMain = null;
        } else {
            cityNameElem.innerHTML = cityValue;
            tempElem.innerHTML = Math.round(data.main.temp) + "°C";
            currentWeatherMain = data.weather[0].main;

            if(data.weather[0].main==="Clouds"){
                iconElem.innerHTML = "cloud";
                document.body.className = "bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500";
            }
            else if(data.weather[0].main==="Rain"){
                iconElem.innerHTML = "rainy";
                document.body.className = "bg-gradient-to-br from-sky-500 via-slate-500 to-slate-700";
            } else if(data.weather[0].main==="Clear"){
                document.body.className = "bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-500";
                iconElem.innerHTML = "sunny";
            } else if(data.weather[0].main==="Snow"){
                iconElem.innerHTML = "ac_unit";
                document.body.className = "bg-gradient-to-br from-slate-100 via-slate-300 to-blue-200";
            } else {
                iconElem.innerHTML = "help";
                document.body.className = "bg-gradient-to-br from-indigo-400 via-blue-500 to-indigo-800";
            }
        }
    } catch (error) {
        cityNameElem.innerHTML = "Error fetching data";
        tempElem.innerHTML = "";
        iconElem.innerHTML = `<span class="material-symbols-outlined text-5xl">error</span>`;
        currentWeatherMain = null;
    }
}

searchBtn.addEventListener("click", () => {
    checkweather(city.value);
});

// Add Enter key functionality
city.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        checkweather(city.value);
    }
});

const card = document.getElementById('weatherCard');
const gradient = document.getElementById('cursor-gradient');
if (card && gradient) {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const [c1, c2, c3] = getCursorGradientColors(currentWeatherMain);
        gradient.style.background = `
            radial-gradient(circle 60px at ${x}px ${y}px, 
                ${c1} 0%, 
                ${c2} 60%, 
                ${c3} 100%)
        `;
    });
    card.addEventListener('mouseleave', () => {
        gradient.style.background = 'none';
    });
}
