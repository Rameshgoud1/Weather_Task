import React from 'react';
import { getWeatherIcon } from '../utils/weatherIcons';
import './ForecastItem.css';

function ForecastItem({ forecast, isCelsius, isFirst }) {
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

  /**
   * Format time for display
   */
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const temperature = convertTemperature(forecast.temperature);
  const windSpeed = convertWindSpeed(forecast.windSpeed);
  const weatherIcon = getWeatherIcon(forecast.weatherCode, forecast.isDay);
  const temperatureUnit = isCelsius ? '°C' : '°F';
  const windUnit = isCelsius ? 'km/h' : 'mph';
  const timeLabel = isFirst ? 'Now ' + formatTime(forecast.time) : formatTime(forecast.time);

  return (
    <div className={`forecast-item ${isFirst ? 'current' : ''}`}>
      <div className="forecast-time">
        {timeLabel}
      </div>
      
      <div className="forecast-icon">
        {weatherIcon}
      </div>
      
      <div className="forecast-temperature">
        {temperature}{temperatureUnit}
      </div>
      
      <div className="forecast-wind">
        <span className="wind-icon">💨</span>
        <span className="wind-speed">{windSpeed} {windUnit}</span>
      </div>
    </div>
  );
}

export default ForecastItem;