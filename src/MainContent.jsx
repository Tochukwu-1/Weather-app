import React, { useEffect, useState } from "react";
import ReactDom from "react-dom/client";

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
                minTemp: temperature_2m_max,
                maxTemp: temperature_2m_min,
                weather_code: weather_code,
            });
        }
    }
    updateWeather()
},[weather.dailyWeather])

  function handleDay(date) {
    return new Intl.DateTimeFormat("en", {
      weekday: "short",
    }).format(new Date(date));
  }
  
  return (
    <main>
      <section>
        <div className="left">
          <div className="day"></div>
          <div className="parameters"></div>
          <div className="weekly" >
            <h4>Daily Forcast</h4>
            <div className="days">
              {dates.map((date, i) => (
              <div >
                <li>{handleDay(date)}</li>
                <li>
                  <span>{minTemp.at(i)}&deg;</span>
                   <span>{maxTemp.at(i)}&deg;</span>
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
