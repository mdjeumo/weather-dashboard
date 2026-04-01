import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "1681d76ca8acce2b5d566db3aad31ae5";

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
      console.log(err);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "80px",
        fontFamily: "Arial",
      }}
    >
      <h1>🌤 Weather Dashboard</h1>

      <input
        type="text"
        placeholder="Enter city (ex: Tokyo)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "10px", fontSize: "16px" }}
      />

      <br /><br />

      <button
        onClick={getWeather}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Search
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "30px" }}>
          <h2>{weather.name}</h2>
          <h3>{weather.main.temp}°C</h3>
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;