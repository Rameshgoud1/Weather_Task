/**
 * Weather icon mapping based on WMO weather codes and day/night status
 * Open-Meteo uses WMO weather codes: https://open-meteo.com/en/docs
 */

export const getWeatherIcon = (weatherCode, isDay) => {
  // If no weather code provided, use day/night status
  if (weatherCode === undefined || weatherCode === null) {
    return isDay === 1 ? '☀️' : '🌙';
  }

  // WMO Weather interpretation codes
  switch (weatherCode) {
    case 0: // Clear sky
      return isDay === 1 ? '☀️' : '🌙';
    
    case 1: // Mainly clear
    case 2: // Partly cloudy
      return isDay === 1 ? '🌤️' : '🌙';
    
    case 3: // Overcast
      return '☁️';
    
    case 45: // Fog
    case 48: // Depositing rime fog
      return '🌫️';
    
    case 51: // Drizzle: Light
    case 53: // Drizzle: Moderate
    case 55: // Drizzle: Dense intensity
    case 56: // Freezing Drizzle: Light
    case 57: // Freezing Drizzle: Dense intensity
    case 61: // Rain: Slight
    case 63: // Rain: Moderate
    case 65: // Rain: Heavy intensity
    case 66: // Freezing Rain: Light
    case 67: // Freezing Rain: Heavy intensity
    case 80: // Rain showers: Slight
    case 81: // Rain showers: Moderate
    case 82: // Rain showers: Violent
      return '🌧️';
    
    case 71: // Snow fall: Slight
    case 73: // Snow fall: Moderate
    case 75: // Snow fall: Heavy intensity
    case 77: // Snow grains
    case 85: // Snow showers: Slight
    case 86: // Snow showers: Heavy
      return '❄️';
    
    case 95: // Thunderstorm: Slight or moderate
    case 96: // Thunderstorm with slight hail
    case 99: // Thunderstorm with heavy hail
      return '⛈️';
    
    default:
      // Fallback to day/night if unknown weather code
      return isDay === 1 ? '☀️' : '🌙';
  }
};

/**
 * Get weather description from WMO code
 */
export const getWeatherDescription = (weatherCode) => {
  switch (weatherCode) {
    case 0: return 'Clear sky';
    case 1: return 'Mainly clear';
    case 2: return 'Partly cloudy';
    case 3: return 'Overcast';
    case 45: return 'Foggy';
    case 48: return 'Depositing rime fog';
    case 51: return 'Light drizzle';
    case 53: return 'Moderate drizzle';
    case 55: return 'Dense drizzle';
    case 56: return 'Light freezing drizzle';
    case 57: return 'Dense freezing drizzle';
    case 61: return 'Slight rain';
    case 63: return 'Moderate rain';
    case 65: return 'Heavy rain';
    case 66: return 'Light freezing rain';
    case 67: return 'Heavy freezing rain';
    case 71: return 'Slight snow';
    case 73: return 'Moderate snow';
    case 75: return 'Heavy snow';
    case 77: return 'Snow grains';
    case 80: return 'Slight rain showers';
    case 81: return 'Moderate rain showers';
    case 82: return 'Violent rain showers';
    case 85: return 'Slight snow showers';
    case 86: return 'Heavy snow showers';
    case 95: return 'Thunderstorm';
    case 96: return 'Thunderstorm with hail';
    case 99: return 'Heavy thunderstorm';
    default: return 'Unknown';
  }
};