import React, { useEffect, useState } from "react";
import ReactDom from "react-dom/client";
import sunny from "./assets/images/icon-sunny.webp";
import snow from "./assets/images/icon-snow.webp";
import storm from "./assets/images/icon-storm.webp";
import rain from "./assets/images/icon-rain.webp";
import partlyCloudy from "./assets/images/icon-partly-cloudy.webp";
import overcast from "./assets/images/icon-overcast.webp";
import fog from "./assets/images/icon-fog.webp";
import drizzle from "./assets/images/icon-drizzle.webp";
import Today from "./components/Today";
import Parameters from "./components/Parameters";
import Weekly from "./components/Weekly";
import Hours from "./components/Hours";

function MainContent({ weather, country, unit, dayMenu, setDayMenu }) {

  const date = new Date();
  const [selectedDay, setSelectedDay] = useState(handleDay(date));

  // weekly weather
  const [weeklyWeather, setweeklyWeather] = useState({
    dates: [],
    minTemp: [],
    maxTemp: [],
    weather_code: [],
  });

  // current weather
  const [currentWeather, setCurrrentWeather] = useState({
    precipitation: "",
    temperature: "",
    currentDate: "",
    currentWeatherCode: "",
    windSpeed: "",
    humidity: "",
  });

  //hourly variables

  // UseEffect for updating the different weather variables when the inputed city searched
  useEffect(() => {
    const updateWeather = () => {
      if (weather.dailyWeather !== undefined) {
        const { time, temperature_2m_max, temperature_2m_min, weather_code } =
          weather.dailyWeather;
        setweeklyWeather({
          dates: time,
          maxTemp: temperature_2m_max,
          minTemp: temperature_2m_min,
          weather_code: weather_code,
        });
      }
      if (weather.currentWeather !== undefined) {
        const {
          precipitation,
          temperature_2m,
          time,
          weather_code,
          wind_speed_10m,
          relative_humidity_2m,
        } = weather.currentWeather;
        console.log(weather.currentWeather);
        setCurrrentWeather({
          precipitation: precipitation,
          temperature: temperature_2m,
          currentDate: time,
          currentWeatherCode: weather_code,
          windSpeed: wind_speed_10m,
          humidity: relative_humidity_2m,
        });
      }
    };
    updateWeather();
  }, [weather.dailyWeather, weather.currentWeather]);

  // getting of the weather icon for the received weather code
  function getWeatherIcon(wmoCode) {
    const icons = new Map([
      [[0], sunny],
      [[1, 2], partlyCloudy],
      [[3], overcast],
      [[45, 48], fog],
      [[51, 53, 55, 56, 57], drizzle],
      [[61, 63, 65, 66, 67, 80, 81, 82], rain],
      [[71, 73, 75, 77, 85, 86], snow],
      [[95], storm],
      [[96, 99], storm],
    ]);
    const arr = [...icons.keys()].find((key) => key.includes(wmoCode));

    if (!arr) return "NOT FOUND";
    return icons.get(arr);
  }
  // weekday date configuration
  function handleDay(date) {
    return new Intl.DateTimeFormat("en", {
      weekday: "long",
    }).format(new Date(date));
  }

  function handleTime(hourly) {
    return new Intl.DateTimeFormat("en", {
      hour: "numeric",
      hour12: true,
    }).format(new Date(hourly));
  }

  //current day date configuration
  function handleCurrentDay(date) {
    return new Intl.DateTimeFormat("en", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  }
  return (
    <main>
      <section>
        <div className="left">
          <Today
            country={country}
            handleCurrentDay={handleCurrentDay}
            currentWeather={currentWeather}
            getWeatherIcon={getWeatherIcon}
          />
          <Parameters unit={unit} currentWeather={currentWeather} />
          <Weekly
            weeklyWeather={weeklyWeather}
            handleDay={handleDay}
            getWeatherIcon={getWeatherIcon}
          />
        </div>
        <aside className="right">
          
          <Hours
            dayMenu={dayMenu}
            setDayMenu={setDayMenu}
            weather={weather}
            handleDay={handleDay}
            handleTime={handleTime}
            selectedDay={selectedDay}
            getWeatherIcon={getWeatherIcon}
            setSelectedDay={setSelectedDay}
            date={date}
          />
        </aside>
      </section>
    </main>
  );
}

export default MainContent;
