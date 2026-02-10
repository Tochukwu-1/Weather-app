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

function MainContent({ weather, country }) {
  const [weeklyWeather, setweeklyWeather] = useState({
    dates: [],
    minTemp: [],
    maxTemp: [],
    weather_code: [],
  });
  const {dates,minTemp,maxTemp,weather_code} = weeklyWeather;
  const [currentWeather, setCurrrentWeather] = useState({
    precipitation: '',
    temperature: '',
    currentDate: '',
    currentWeatherCode: '',
    windSpeed: '',
    humidity: ''
  });
  const {precipitation, temperature, currentDate,  currentWeatherCode, windSpeed, humidity} = currentWeather;
    
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
        if(weather.currentWeather!== undefined){
          const {precipitation,temperature_2m, time,weather_code,wind_speed_10m, relative_humidity_2m} = weather.currentWeather;
          console.log(weather.currentWeather)
          setCurrrentWeather({
          precipitation: precipitation,
          temperature: temperature_2m,
          currentDate: time,
          currentWeatherCode: weather_code,
          windSpeed: wind_speed_10m,
          humidity: relative_humidity_2m
        })
        }
    }
    updateWeather()
},[weather.dailyWeather,weather.currentWeather])

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
  function handleCurrentDay(date) {
    return new Intl.DateTimeFormat("en", {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  }
  
  return (
    <main>
      <section>
        <div className="left">
          {/* { currentWeather.map(() => */}

            <div className="today">
              <div className="nameDate">
                <h2 className="country" >{country.town}, {country.country}</h2>
              <p className="date">{currentDate? handleCurrentDay(currentDate): "no date"  }</p>
              </div>
              <div className="weatherTemp">
                <span><img src={getWeatherIcon(currentWeatherCode)} alt="" /></span>
                <span>{temperature} &deg;</span>
              </div>
            </div>
            <>
              <div className="parameters">
                <div className="parameter">
                  <p>Feels like</p>
                  <li>{temperature} &deg;</li>
                </div>
                <div className="parameter">
                  <p>Humidity</p>
                  <li>{humidity} %</li>
                </div>
                <div className="parameter">
                  <p>Wind</p>
                  <li>{windSpeed} km/h</li>
                </div>
                <div className="parameter">
                  <p>Precipitation</p>
                  <li>{precipitation} mm</li>
                </div>

              </div>
            </>
          {/* )
          } */}
          <div className="weekly" >
            <h4>Daily Forcast</h4>
            <div className="days">
              {dates.map((date, i) => (
                <div className="day" >
                  <li>{handleDay(date)}</li>
                  <li><img src={getWeatherIcon(weather_code.at(i))} /></li>
                  <li className="temp">
                    <span>{Math.floor(maxTemp.at(i))}&deg;</span>
                    <span>{Math.floor(minTemp.at(i))}&deg;</span>
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
