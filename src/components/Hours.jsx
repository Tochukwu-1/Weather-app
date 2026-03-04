import React from 'react'
import ReactDom from 'react-dom/client'


function Hours({weather, handleDay, handleTime, selectedDay, getWeatherIcon}) {
const {
    temperature_2m: hourlyTemperature,
    time: hourlyTime,
    weather_code: hourlyCode,
  } = weather.hourlyWeather;

    return (
        <ul className="hours">
            {weather?.hourlyWeather?.time &&
              hourlyTime
                ?.map((hour, index) => ({ hour, temperature:hourlyTemperature[index], weatherCode:hourlyCode[index], index}))
                .filter((time) => handleDay(time.hour) === selectedDay).map((time, i) => {
                  return(

                    <li className="hour" key={i}>
                    <span className="lefthour">
                      <img
                        className="hourlycode"
                        src={getWeatherIcon(time.weatherCode)}
                        alt=""
                      />
                      {handleTime(time.hour)}
                    </span>
                    <span className="hourtemp">
                      
                      {Math.round(time.temperature)}&deg;
                    </span>
                  </li>
                    )
                    
                  })
            }
          </ul>
    )
}

export default Hours
