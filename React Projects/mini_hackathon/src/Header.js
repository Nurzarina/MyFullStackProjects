import React, { useState, useEffect } from 'react';
import './Header.css';

function Header() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentWeather, setCurrentWeather] = useState('');

  useEffect(() => {
    // Fetch current time and date
    function getCurrentTimeAndDate() {
      const currentDate = new Date();
      setCurrentTime(currentDate.toLocaleTimeString());
      setCurrentDate(currentDate.toLocaleDateString());
    }

    // Fetch current weather
    function getCurrentWeather() {
      const apiKey = "3e5375e4e6b0bcf722cee713718c51b9";
      const city = "Moscow";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const weatherDescription = data.weather[0].description;
          const temperature = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
          setCurrentWeather(`${weatherDescription}, ${temperature}°C`);
        })
        .catch(error => {
          console.error("Error fetching weather data:", error);
        });
    }

    // Update time and date every second
    const intervalId = setInterval(getCurrentTimeAndDate, 1000);

    // Fetch current weather once
    getCurrentWeather();

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="top-panel">
        
      <div className="time-date">
        <span id="current-time">{currentTime}</span>
        <hr></hr>
        <span id="current-date">{currentDate}</span>
      </div>
      <h1 className='text-dark text-center py-4'>Task Manager</h1>
      <div className="weather">
        <span id="current-weather">{currentWeather}</span>
      </div>

    </div>
    
  );
}

export default Header;
