import React, { useState } from "react";

// ⚠️ Replace with your OpenWeatherMap API key
const API_KEY = "b2705cb751d8627aff55ee7c7f1aefcd";

export default function Weather() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchByCity(q) {
    if (!q) return;
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          q
        )}&units=metric&appid=${API_KEY}`
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "City not found");

      setData(json);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  async function fetchByCoords(lat, lon) {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Weather fetch failed");

      setData(json);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  function onSearch(e) {
    e.preventDefault();
    fetchByCity(city);
  }

  function locate() {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
      (err) => setError(err.message)
    );
  }

  function clearWeather() {
    setCity("");
    setData(null);
    setError("");
  }

  return (
    <div className="max-w-md mx-auto my-10 p-6 rounded-2xl shadow-xl bg-gradient-to-b from-blue-50 to-white border">
      {/* Search Form */}
      <form onSubmit={onSearch} className="flex gap-2 mb-5">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city (e.g. Manila)"
          className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <button className="px-5 py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition">
          Search
        </button>
      </form>

      {/* Location & Clear Buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={locate}
          className="flex-1 px-3 py-2 border rounded-lg hover:bg-gray-100 transition"
        >
          📍 Use My Location
        </button>
        <button
          onClick={clearWeather}
          className="flex-1 px-3 py-2 border rounded-lg hover:bg-gray-100 transition"
        >
          ❌ Clear
        </button>
      </div>

      {/* Status Messages */}
      {loading && <div className="text-gray-500">Loading…</div>}
      {error && <div className="text-red-600">{error}</div>}

      {/* Weather Data */}
      {data && (
        <div className="mt-4 p-5 bg-white rounded-xl shadow-md border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-2xl font-bold">
                {data.name}, {data.sys?.country}
              </div>
              <div className="text-gray-500 capitalize">
                {data.weather?.[0]?.description}
              </div>
            </div>

            {/* Weather Icon */}
            {data.weather?.[0]?.icon && (
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={data.weather[0].description}
                className="w-16 h-16"
              />
            )}
          </div>

          <div className="text-center text-5xl font-extrabold text-blue-600 mb-4">
            {Math.round(data.main.temp)}°C
          </div>

          <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
            <div className="p-2 bg-gray-50 rounded-lg text-center">
              Feels: {Math.round(data.main.feels_like)}°C
            </div>
            <div className="p-2 bg-gray-50 rounded-lg text-center">
              Humidity: {data.main.humidity}%
            </div>
            <div className="p-2 bg-gray-50 rounded-lg text-center">
              Wind: {data.wind?.speed} m/s
            </div>
          </div>
        </div>
      )}

      {/* Tip */}
      <p className="mt-6 text-xs text-gray-400 text-center">
        🌦 Make sure your API key is active. Free OpenWeatherMap keys may take a
        few minutes to activate.
      </p>
    </div>
  );
}
