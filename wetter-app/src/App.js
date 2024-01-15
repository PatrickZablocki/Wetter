import React, { useState } from 'react';
import './App.css';

const API_KEY = 'DEIN_OPENWEATHERMAP_API_KEY';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Stadt nicht gefunden');
      }

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="App">
      <h1>Wetter-App</h1>
      <input
        type="text"
        placeholder="Stadt eingeben"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Wetter abrufen</button>

      {weather && (
        <div>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temperatur: {weather.main.temp}°C</p>
          <p>Wetter: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;