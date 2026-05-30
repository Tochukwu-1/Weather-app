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
                {temperature===undefined && <li className='loadingDash'></li>}{temperature && <li>{Math.round(temperature)} &deg;</li>}
              </div>
              <div className="parameter">
                <p>Humidity</p>
                {humidity===undefined && <li className='loadingDash'></li>}{humidity && <li>{humidity} %</li>}
              </div>
              <div className="parameter">
                <p>Wind</p>
                {windSpeed===undefined && <li className='loadingDash'></li>}{windSpeed && <li>{windSpeed} {unit.windSpeed==="kmh"?"km/h": "mph"}</li>}
              </div>
              <div className="parameter">
                <p>Precipitation</p>
                {precipitation===undefined && <li className='loadingDash'></li>}{precipitation && <li>{precipitation} {unit.precipitation ==="inch"? "inch": "mm"}</li>}
              </div>
            </div>
    )
}

export default Parameters
