import React from 'react';
import ForecastItem from './ForecastItem';
import './ForecastList.css';

function ForecastList({ forecast, isCelsius }) {
  if (!forecast || forecast.length === 0) {
    return null;
  }

  return (
    <div className="forecast-list">
      <div className="forecast-header">
        <h3>5-Hour Forecast</h3>
        <span className="forecast-subtitle">Hourly weather predictions</span>
      </div>
      
      <div className="forecast-items">
        {forecast.map((item, index) => (
          <ForecastItem
            key={index}
            forecast={item}
            isCelsius={isCelsius}
            isFirst={index === 0}
          />
        ))}
      </div>
    </div>
  );
}

export default ForecastList;