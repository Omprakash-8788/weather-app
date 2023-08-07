import React, { useState } from "react";
import "./Main.css";
import Loader from "./loader";

function Main() {
  const [city, setCity] = useState("");
  const [valid, setValid] = useState(false);
  const [validations, setValidations] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [found, setFound] = useState(false);
  const [searching, setSearching] = useState(false);
  const apiKey = "84dd0d8c91f964cdb8a87279a9ae38df";
  var validation = "Enter any city name";
  var cityLength = "city length must be greater than 2";

  const fetchWeatherData = async () => {
    if (city) {
      try {
        setSearching(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        setWeatherData(data);
        if (response.status === 404) {
          setFound(true);
          setWeatherData(null);
        } else {
          setFound(false);
          setWeatherData(data);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        console.log(error);
        console.log(error);
      } finally {
        setSearching(false); // Set loading to false when fetching is done
      }
    }
  };

  const handleSubmit = (e) => {
    setSearching(true);
    if (city.trim() === "") {
      setValid(true);
    } else {
      setValid(false);
    }
    if (city.length <= 2) {
      setValidations(true);
    } else {
      setValidations(false);
    }
    setCity("");

    setWeatherData(null);
    e.preventDefault("");
    fetchWeatherData();
    console.log(weatherData);
  };
  const cities = [
    { id: 1, name: "New York" },
    { id: 2, name: "Los Angeles" },
    { id: 3, name: "Chicago" },
    { id: 4, name: "Houston" },
    { id: 5, name: "Miami" },
    // Add more cities as needed
  ];

  const [selectedCity, setSelectedCity] = useState("");

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const changeHandler = (e) => {
    setCity(e.target.value);
  };
  return (
    <div className="App">
      <div className="weather-container">
        <h2>Welcome to Weather Info by entering city name</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={changeHandler}
          />
          <button type="submit">Get Weather Info </button>
        </form>
        {valid && <h3 className="validation">Enter city name</h3>}
        {!valid && validations && (
          <h3 className="validation">City length must be greater than 2</h3>
        )}
        {!validations && found && (
          <h2 className="validation">City not found</h2>
        )}
        {!valid && !validations && searching ? (
          <>
            <h2>Loading...</h2>
            <Loader />
          </>
        ) : (
          !valid &&
          !validations &&
          weatherData && (
            <div className="weather-info">
              <h2>
                {weatherData.name}, {weatherData.sys.country}
              </h2>

              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>Weather: {weatherData.weather[0].description}</p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
              <p>Latitude : {weatherData.coord.lat}</p>
              <p>Latitude : {weatherData.coord.lon}</p>
              <p>Chances of Rain: {weatherData.main.humidity + "%"}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Main;
