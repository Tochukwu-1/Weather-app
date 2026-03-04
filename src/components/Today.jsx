import React from 'react'
import ReactDom from 'react-dom/client'


function Today({country, handleCurrentDay, getWeatherIcon,currentWeather}) {
    const {
    temperature,
    currentDate,
    currentWeatherCode
    } = currentWeather;
    return (
        <div className="today">
            <div className="nameDate">
              <h2 className="country">
                {country.town}, {country.country}
              </h2>
              <p className="date">
                {currentDate ? handleCurrentDay(currentDate) : "no date"}
              </p>
            </div>
            <div className="weatherTemp">
              <span>
                <img src={getWeatherIcon(currentWeatherCode)} alt="" />
              </span>
              <span>{Math.round(temperature || 0)} &deg;</span>
            </div>
          </div>
    )
}

export default Today
