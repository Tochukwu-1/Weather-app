import React from 'react'
import ReactDom from 'react-dom/client'


function Today({country, handleCurrentDay, getWeatherIcon,currentWeather}) {
    const {
    temperature,
    currentDate,
    currentWeatherCode
    } = currentWeather;
    return (
      <>
        {!temperature && <div className={`today todayLoading`}>
          <div className="loadingDots">
            <div className="dot one"></div>
            <div className="dot two"></div>
            <div className="dot three"></div>
            </div>
          <p>Loading...</p>
          </div>}
        {temperature && 
          <div className="today">
            <div className="nameDate">
              <h2 className="country">
                {country.town}, {country.country}
              </h2>
              <p className="date">
                {currentDate ? handleCurrentDay(currentDate) : ""}
              </p>
            </div>
            <div className="weatherTemp">
              <span>
                <img src={getWeatherIcon(currentWeatherCode)} alt="" />
              </span>
              {temperature===undefined && <span>--</span>}{temperature && <span>{Math.round(temperature)} &deg;</span>}
            </div>
          </div>}
      </>
    )
}

export default Today
