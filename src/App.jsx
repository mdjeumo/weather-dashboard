import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      const data = await response.json();

      if (data.cod !== 200) {
        setError("City not found");
        setWeather(null);
        return;
      }

      setWeather(data);
      setError("");
    } catch (err) {
      setError("Something went wrong");
    }
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
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>Weather App 🌤</h1>

        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: "10px",
            width: "80%",
            borderRadius: "10px",
            border: "none",
            marginBottom: "15px",
          }}
        />

        <br />

        <button
          onClick={getWeather}
          style={{
            padding: "10px 25px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Search
        </button>

        {error && (
          <p style={{ color: "#ffdddd", marginTop: "15px" }}>{error}</p>
        )}

        {weather && (
          <div style={{ marginTop: "25px" }}>
            <h2>{weather.name}</h2>

            <h1 style={{ fontSize: "60px", margin: "10px 0" }}>
              {weather.main.temp}°C
            </h1>

            <p style={{ fontSize: "18px" }}>
              {weather.weather[0].description}
            </p>

            <p>Feels like: {weather.main.feels_like}°C</p>

            <p>Humidity: {weather.main.humidity}%</p>

            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;