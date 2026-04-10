import React from 'react'
import ReactDom from 'react-dom/client'


function Parameters({currentWeather, unit}) {
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
                <li>{windSpeed || 0} {unit.windSpeed==="kmh"?"km/h": "mph"}</li>
              </div>
              <div className="parameter">
                <p>Precipitation</p>
                <li>{precipitation || 0} {unit.precipitation ==="millimeter"? "mm": "inches"}</li>
              </div>
            </div>
    )
}

export default Parameters
