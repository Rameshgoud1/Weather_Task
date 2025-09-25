import React from 'react';
import { getWeatherIcon, getWeatherDescription } from '../utils/weatherIcons';
import './WeatherCard.css';

function WeatherCard({ weather, location, isCelsius }) {
  /**
   * Convert temperature between Celsius and Fahrenheit
   */
  const convertTemperature = (celsius) => {
    if (isCelsius) {
      return Math.round(celsius);
    } else {
      return Math.round((celsius * 9/5) + 32);
    }
  };

  /**
   * Convert wind speed from km/h to mph
   */
  const convertWindSpeed = (kmh) => {
    if (isCelsius) {
      return Math.round(kmh);
    } else {
      return Math.round(kmh * 0.621371);
    }
  };

  const temperature = convertTemperature(weather.temperature);
  const windSpeed = convertWindSpeed(weather.windSpeed);
  const weatherIcon = getWeatherIcon(weather.weatherCode, weather.isDay);
  const weatherDescription = getWeatherDescription(weather.weatherCode);
  const temperatureUnit = isCelsius ? '°C' : '°F';
  const windUnit = isCelsius ? 'km/h' : 'mph';

  return (
    <div className="weather-card">
      <div className="weather-card-header">
        <div className="location">
          <span className="location-icon">📍</span>
          <span className="location-name">{location}</span>
        </div>
        <div className="current-time">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      <div className="weather-main">
        <div className="weather-icon-container">
          <span className="weather-icon">{weatherIcon}</span>
          <span className="weather-description">{weatherDescription}</span>
        </div>
        
        <div className="temperature-container">
          <span className="temperature">{temperature}</span>
          <span className="temperature-unit">{temperatureUnit}</span>
        </div>
      </div>

      <div className="weather-details">
        <div className="weather-detail">
          <span className="detail-icon">💨</span>
          <div className="detail-info">
            <span className="detail-label">Wind Speed</span>
            <span className="detail-value">{windSpeed} {windUnit}</span>
          </div>
        </div>
        
        <div className="weather-detail">
          <span className="detail-icon">{weather.isDay === 1 ? '☀️' : '🌙'}</span>
          <div className="detail-info">
            <span className="detail-label">Time of Day</span>
            <span className="detail-value">{weather.isDay === 1 ? 'Day Time' : 'Night Time'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;