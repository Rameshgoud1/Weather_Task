import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, onUseLocation, loading }) {
  const [city, setCity] = useState('');

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() && !loading) {
      onSearch(city.trim());
    }
  };

  /**
   * Handle input change
   */
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  /**
   * Handle use my location button click
   */
  const handleLocationClick = () => {
    if (!loading) {
      onUseLocation();
      setCity(''); // Clear the input when using location
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={city}
            onChange={handleInputChange}
            placeholder="Enter city name (e.g., London, New York)"
            className="search-input"
            disabled={loading}
          />
          <button
            type="submit"
            className="search-button"
            disabled={loading || !city.trim()}
          >
            {loading ? (
              <div className="loading"></div>
            ) : (
              '🔍'
            )}
          </button>
        </div>
      </form>
      
      <div className="location-button-container">
        <button
          onClick={handleLocationClick}
          className="location-button"
          disabled={loading}
          title="Use my current location"
        >
          {loading ? (
            <div className="loading"></div>
          ) : (
            <>📍 Use My Location</>
          )}
        </button>
      </div>
    </div>
  );
}

export default SearchBar;