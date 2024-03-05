import { useState, useEffect } from "react";
import axios from "axios";

const api_key = import.meta.env.VITE_SOME_KEY;

const Country = ({ country }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [coords, setCoords] = useState({ lat: 0, lon: 0 });
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${country.capital}&limit=5&appid=${api_key}`
      )
      .then((response) => {
        setCoords({
          lat: response.data[0].lat,
          lon: response.data[0].lon,
        });
      });

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${api_key}`
      )
      .then((response) => setWeather(response.data));
  }, []);

  const handleShow = () => setIsShowing(!isShowing);

  if (!isShowing) {
    return (
      <p>
        {country.name.common}{" "}
        <button onClick={handleShow}>{isShowing ? "Hide" : "Show"}</button>
      </p>
    );
  }

  if (weather) {
    return (
      <>
        <p>
          {country.name.common}{" "}
          <button onClick={handleShow}>{isShowing ? "Hide" : "Show"}</button>
        </p>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>

        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt="flag" />

        <h3>Weather in {country.capital}</h3>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="weather icon"
        />
        <p>Temperature: {(weather.main.temp - 273.15).toFixed(1)} Celsius</p>
        <p>Wind: {weather.wind.speed} m/s</p>
      </>
    );
  }
};

export default Country;
