import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCelsius, setIsCelsius] = useState(true);
  const [currentLocation, setCurrentLocation] = useState('');

  /**
   * Fetch coordinates from city name using Open-Meteo Geocoding API
   */
  const fetchCoordinates = async (cityName) => {
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`
      );
      const data = await response.json();
      
      if (!data.results || data.results.length === 0) {
        throw new Error('City not found. Please check the spelling and try again.');
      }
      
      const { latitude, longitude, name, country } = data.results[0];
      setCurrentLocation(`${name}, ${country}`);
      return { latitude, longitude };
    } catch (error) {
      throw new Error(error.message || 'Failed to find city coordinates');
    }
  };

  /**
   * Fetch weather data from Open-Meteo Weather API
   */
  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,is_day,wind_speed_10m,weathercode&current=temperature_2m,wind_speed_10m,weathercode,is_day&timezone=auto`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();

      // Process current weather
      const currentWeather = {
        temperature: data.current.temperature_2m,
        windSpeed: data.current.wind_speed_10m,
        isDay: data.current.is_day,
        weatherCode: data.current.weathercode,
      };
      
      // current time from API
      let now = data.current.time;

      // find where this fits in hourly array
      let currentIndex = data.hourly.time.findIndex((t) => t === now);

      // if exact match not found (because current.time might be in 15-min steps),
      // find the closest upcoming hour instead
      if (currentIndex === -1) {
        currentIndex = data.hourly.time.findIndex(
          (t) => new Date(t) > new Date(now)
        );
      }
      console.log(data);
      let forecast = [];

      // get next 5 hours starting from currentIndex
      for (let i = currentIndex; i < currentIndex + 5; i++) {
        forecast.push({
          time: data.hourly.time[i],
          temperature: data.hourly.temperature_2m[i],
          windSpeed: data.hourly.wind_speed_10m[i],
          isDay: data.hourly.is_day[i],
          weatherCode: data.hourly.weathercode[i],
        });
      }

      setWeatherData(currentWeather);
      setForecastData(forecast);
      setError("");
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch weather data');
    }
  };

  /**
   * Handle city search
   */
  const handleCitySearch = async (cityName) => {
    if (!cityName.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const coordinates = await fetchCoordinates(cityName);
      await fetchWeatherData(coordinates.latitude, coordinates.longitude);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
      setForecastData([]);
      setCurrentLocation('');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle geolocation (Use My Location button)
   */
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          setCurrentLocation('Your Location');
          await fetchWeatherData(latitude, longitude);
        } catch (error) {
          setError(error.message);
          setWeatherData(null);
          setForecastData([]);
          setCurrentLocation('');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        let errorMessage = 'Failed to get your location';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please allow location access and try again.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        
        setError(errorMessage);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  /**
   * Toggle temperature unit
   */
  const handleTemperatureToggle = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1>Weather Dashboard</h1>
          <p>Get current weather and 5-hour forecast</p>
        </header>

        <SearchBar
          onSearch={handleCitySearch}
          onUseLocation={handleUseMyLocation}
          loading={loading}
        />

        <div className="temperature-toggle">
          <button
            onClick={handleTemperatureToggle}
            className={`toggle-btn ${isCelsius ? 'active' : ''}`}
          >
            °C
          </button>
          <button
            onClick={handleTemperatureToggle}
            className={`toggle-btn ${!isCelsius ? 'active' : ''}`}
          >
            °F
          </button>
        </div>

        {error && (
          <div className="error-message">
            <span>⚠️ {error}</span>
          </div>
        )}

        {loading && (
          <div className="loading-container">
            <div className="loading"></div>
            <span>Loading weather data...</span>
          </div>
        )}

        {weatherData && !loading && (
          <>
            <WeatherCard
              weather={weatherData}
              location={currentLocation}
              isCelsius={isCelsius}
            />
            
            <ForecastList
              forecast={forecastData}
              isCelsius={isCelsius}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
