import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeather = async () => {
    if (!city) return;

    try {
      setLoading(true);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      const data = await response.json();

      if (data.cod !== 200) {
        setError("City not found");
        setWeather(null);
        setLoading(false);
        return;
      }

      setWeather(data);
      setError("");
      setLoading(false);
    } catch (err) {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  const getLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        setLoading(true);

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );

        const data = await response.json();

        setWeather(data);
        setError("");
        setLoading(false);
      } catch {
        setError("Location unavailable");
        setLoading(false);
      }
    });
  };

  const getBackground = () => {
    if (!weather) return "linear-gradient(to right, #4facfe, #00f2fe)";

    const condition = weather.weather[0].main;

    if (condition === "Clear")
      return "linear-gradient(to right, #fbc2eb, #a6c1ee)";
    if (condition === "Rain")
      return "linear-gradient(to right, #667db6, #0082c8)";
    if (condition === "Clouds")
      return "linear-gradient(to right, #bdc3c7, #2c3e50)";
    if (condition === "Snow")
      return "linear-gradient(to right, #e6dada, #274046)";

    return "linear-gradient(to right, #4facfe, #00f2fe)";
  };

  return (
    <div
      style={{
        height: "100vh",
        background: getBackground(),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
        transition: "0.5s ease",
      }}
    >
      <div
        style={{
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.2)",
          padding: "40px",
          borderRadius: "25px",
          textAlign: "center",
          color: "white",
          width: "320px",
          boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h1>Weather App 🌤</h1>

        {/* INPUT */}
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getWeather()}
          style={{
            padding: "10px",
            width: "80%",
            borderRadius: "10px",
            border: "none",
            marginBottom: "15px",
          }}
        />

        {/* BUTTONS */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button
            onClick={getWeather}
            style={{
              padding: "10px 15px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Search
          </button>

          <button
            onClick={getLocationWeather}
            style={{
              padding: "10px 15px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            📍 My Location
          </button>
        </div>

        {/* LOADING */}
        {loading && <p style={{ marginTop: "15px" }}>Loading weather...</p>}

        {/* ERROR */}
        {error && (
          <p style={{ color: "#ffdada", marginTop: "15px" }}>{error}</p>
        )}

        {/* WEATHER DISPLAY */}
        {weather && !loading && (
          <div style={{ marginTop: "25px" }}>
            <h2>{weather.name}</h2>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
            />

            <h1 style={{ fontSize: "60px" }}>
              {Math.round(weather.main.temp)}°C
            </h1>

            <p style={{ fontSize: "18px" }}>
              {weather.weather[0].description}
            </p>

            <p>Feels like: {weather.main.feels_like}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>

            <p>
              Local time:{" "}
              {new Date(weather.dt * 1000).toLocaleTimeString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;