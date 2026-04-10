import ReactDom from "react-dom/client";
import dropdown from "../assets/images/icon-dropdown.svg";

function Hours({
  weather,
  handleDay,
  handleTime,
  selectedDay,
  getWeatherIcon,
  setSelectedDay,
  date,
  dayMenu,
  setDayMenu,
}) {
  const {
    temperature_2m: hourlyTemperature,
    time: hourlyTime,
    weather_code: hourlyCode,
  } = weather.hourlyWeather;

  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <>
      <div className="top">
        <h4>Hourly forecast</h4>
        <div onClick={() => setDayMenu(!dayMenu)} className="selectedDay">
          {selectedDay} <img src={dropdown} alt="" />
        </div>
        {dayMenu && (
          <div name="day" id="week" className="activeday select">
            {weekdays.map((day, i) => (
              <div
                className="option"
                key={day}
                value={day}
                onClick={() => setSelectedDay(day) / setDayMenu(false)}
                selected={handleDay(date) === day}
                style={{
                  backgroundColor: selectedDay === day ? "#3d3b5e" : "",
                }}
              >
                {weekdays.at(i)}
              </div>
            ))}
          </div>
        )}
      </div>
      <ul className="hours">
        {weather?.hourlyWeather?.time &&
          hourlyTime
            ?.map((hour, index) => ({
              hour,
              temperature: hourlyTemperature[index],
              weatherCode: hourlyCode[index],
              index,
            }))
            .filter((time) => handleDay(time.hour) === selectedDay)
            .map((time, i) => {
              return (
                <li className="hour" key={i}>
                  <span className="lefthour">
                    <img
                      className="hourlycode"
                      src={getWeatherIcon(time.weatherCode)}
                      alt="∇"
                    />
                    {handleTime(time.hour)}
                  </span>
                  <span className="hourtemp">
                    {Math.round(time.temperature)}&deg;
                  </span>
                </li>
              );
            })}
      </ul>
    </>
  );
}

export default Hours;
