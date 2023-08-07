import React, { useEffect, useState } from "react";
import "./DropDown.css";
import Loader from "./loader";

function DropDown() {
  const [valid, setValid] = useState(false);
  const [validations, setValidations] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [found, setFound] = useState(false);
  const [searching, setSearching] = useState(false);
  const apiKey = "84dd0d8c91f964cdb8a87279a9ae38df";
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const fetchWeatherData = async () => {
    if (selectedCity) {
      try {
        setSearching(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`
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
      } finally {
        setSearching(false);
      }
    }
  };

  const countries = [
    {
      id: 1,
      name: "USA",
      cities: [
        "New York",
        "Los Angeles",
        "Chicago",
        "New York",
        "Los Angeles",
        "Chicago",
        "Houston",
        "Phoenix",
        "Philadelphia",
        "San Antonio",
        "San Diego",
        "Dallas",
        "San Jose",
      ],
    },
    {
      id: 2,
      name: "India",
      cities: [
        "Mumbai",
        "Delhi",
        "Bangalore",
        "Hyderabad",
        "Ahmedabad",
        "Chennai",
        "Kolkata",
        "Pune",
        "Surat",
        "Jaipur",
      ],
    },
    {
      id: 3,
      name: "UK",
      cities: [
        "London",
        "Manchester",
        "Birmingham",
        "London",
        "Birmingham",
        "Manchester",
        "Glasgow",
        "Edinburgh",
        "Liverpool",
        "Leeds",
        "Newcastle",
        "Sheffield",
        "Bristol",
      ],
    },
  ];

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedCity("");
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const getCitiesForSelectedCountry = () => {
    const selectedCountryObj = countries.find(
      (country) => country.name === selectedCountry
    );
    return selectedCountryObj ? selectedCountryObj.cities : [];
  };

  return (
    <div className="App">
      <div className="weather-container">
        <h2>Welcome to Weather Info by selecting city name</h2>

        <div>
          <h2>Select a City</h2>
        </div>
      </div>

      <div>
        <label>Select Country: </label>
        <select
          className="select dropdown"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.id} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Select City: </label>
        <select
          className="select"
          value={selectedCity}
          onChange={handleCityChange}
        >
          <option value="">Select a city</option>
          {getCitiesForSelectedCountry().map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <button onClick={fetchWeatherData}>search</button>

      {!valid && !validations && searching ? (
        <>
          <h2>Loading...</h2>
          <Loader />
        </>
      ) : (
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
  );
}

export default DropDown;
