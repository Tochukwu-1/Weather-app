import React, { useEffect, useState } from "react";
import ReactDom from "react-dom/client";
import sunny from './assets/images/icon-sunny.webp';
import snow from './assets/images/icon-snow.webp';
import storm from './assets/images/icon-storm.webp';
import rain from './assets/images/icon-rain.webp';
import partlyCloudy from './assets/images/icon-partly-cloudy.webp';
import overcast from './assets/images/icon-overcast.webp';
import fog from './assets/images/icon-fog.webp';
import drizzle from './assets/images/icon-drizzle.webp';

function MainContent({ weather }) {
  const [weeklyWeather, setweeklyWeather] = useState({
    dates: [],
    minTemp: [],
    maxTemp: [],
    weather_code: [],
  });
  const {dates,minTemp,maxTemp,weather_code} = weeklyWeather;
    
  useEffect(()=>{
    const updateWeather = ()=>{
        if (weather.dailyWeather!== undefined) {
            const { time, temperature_2m_max, temperature_2m_min, weather_code } =
            weather.dailyWeather;
            setweeklyWeather({
                dates: time,
                maxTemp: temperature_2m_max,
                minTemp: temperature_2m_min,
                weather_code: weather_code,
            });
        }
    }
    updateWeather()
},[weather.dailyWeather])

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0,1], sunny],
    [[2], partlyCloudy],
    [[3], overcast],
    [[45, 48], fog],
    [[51,53,55,56,57], drizzle],
    [[61,63, 65,66, 67,80,81, 82], rain],
    [[71, 73, 75, 77, 85, 86], snow],
    [[95], storm],
    [[96, 99],storm],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));

  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

  function handleDay(date) {
    return new Intl.DateTimeFormat("en", {
      weekday: "short",
    }).format(new Date(date));
  }
  
  return (
    <main>
      <section>
        <div className="left">
          <div className="today"></div>
          <div className="parameters"></div>
          <div className="weekly" >
            <h4>Daily Forcast</h4>
            <div className="days">
              {dates.map((date, i) => (
              <div className="day" >
                <li>{handleDay(date)}</li>
                <li><img src={getWeatherIcon(weather_code.at(i))} /></li>
                <li className="temp">
                  <span>{Math.floor(minTemp.at(i))}&deg;</span>
                  <span>{Math.floor(maxTemp.at(i))}&deg;</span>
                   </li>
              </div>
              ))}
            </div>
          </div>
        </div>
        <aside className="right"></aside>
      </section>
    </main>
  );
}

export default MainContent;
