import React from 'react'
import ReactDom from 'react-dom/client'


function Parameters({currentWeather}) {
    const {
        precipitation,
        temperature,
        windSpeed,
        humidity,
      } = currentWeather;
    return (
        <div className="parameters">
              <div className="parameter">
                <p>Feels like</p>
                <li>{Math.round(temperature || 0)} &deg;</li>
              </div>
              <div className="parameter">
                <p>Humidity</p>
                <li>{humidity || 0} %</li>
              </div>
              <div className="parameter">
                <p>Wind</p>
                <li>{windSpeed || 0} km/h</li>
              </div>
              <div className="parameter">
                <p>Precipitation</p>
                <li>{precipitation || 0} mm</li>
              </div>
            </div>
    )
}

export default Parameters
