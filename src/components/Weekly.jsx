import React from 'react'
import ReactDom from 'react-dom/client'


function Weekly({weeklyWeather, handleDay, getWeatherIcon}) {
    
  const { dates, minTemp, maxTemp, weather_code } = weeklyWeather;
    return (
        <div className="weekly">
            <h4>Daily Forcast</h4>
            <div className="days">
              {dates.map((date, i) => (
                <div className="day">
                  <li>{handleDay(date)}</li>
                  <li>
                    <img src={getWeatherIcon(weather_code.at(i))} />
                  </li>
                  <li className="temp">
                    <span>{Math.round(maxTemp.at(i))}&deg;</span>
                    <span>{Math.round(minTemp.at(i))}&deg;</span>
                  </li>
                </div>
              ))}
            </div>
          </div>
    )
}

export default Weekly
