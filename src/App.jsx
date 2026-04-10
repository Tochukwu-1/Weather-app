import { useEffect, useState } from "react";
import Nav from "./Nav.jsx";
import Header from "./Header.jsx";
import MainContent from "./MainContent.jsx";
import "./index.css";
import loading from "./assets/images/icon-loading.svg";

function App() {
  const [menu, setMenu] = useState(false)
  const [searchHistoryMenu, setSearchHistoryMenu] = useState(false)
  const [dayMenu, setDayMenu] = useState(false)


  const [location, setLocation] = useState({
    inputLocation: "",
    currentLocation: "",
    pendingLocation: "",
  });
  const localStorageName = JSON.parse(localStorage.getItem("town"));
  const [searchName,setSearchName] = useState(localStorageName.slice(0,3) || []);
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState({
    dailyweather: [],
    hourlyWeather: [],
    currentWeather: [],
  });
  const [country, setCountry] = useState({ town: "", country: "" });
  const [unit, setUnit] = useState({
    temperature: "celcius",
    windSpeed: "kmh",
    precipitation: "millimeter",
  });
  function toggleMenu() {
    setMenu(false);
    setSearchHistoryMenu(false);
    setDayMenu(false)

  }
  let updated = []
  const addName = (name) => {
  if (name === searchName[0] || name === searchName[1] || name === searchName[2]){ 
    const reupdate =searchName.filter((item) => item !== name);
    updated = [name, ...reupdate]
    localStorage.setItem("town", JSON.stringify(updated));
  setSearchName(updated.slice(0,4))
  }else{
  updated = [name, ...searchName];
  localStorage.setItem("town", JSON.stringify(updated));
  setSearchName(updated.slice(0,4))
}
};



  useEffect(() => {
    async function fetchWeather() {

      try {
        toggleMenu()
        
        // location api to get longitude and latitude of desired location
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${location.currentLocation}`,
        );
        setIsLoading(true);
        if (!geoRes) throw new Error("Failed to fetch location");
        const geoData = await geoRes.json();
        console.log(geoData.results[0]);
        const locationParameters = geoData.results[0];
        const {
          latitude: lat,
          longitude: long,
          country,
          name,
        } = locationParameters;
        setCountry({ town: name, country: country });
        addName(name)
        

let weatherRes = "";        
let currentRes = "";
let hourRes = "";

        if (unit.temperature === "fahrenheit" && unit.precipitation === "inch" && unit.windSpeed === "mph") {
           // weather api for the daily weather
           weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`
          );
          // current weather api
           currentRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,precipitation,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`
          );
            //hourly Api
           hourRes = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weather_code&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`
          );
        }
        else if (unit.temperature === "celcius" && unit.precipitation === "inch" && unit.windSpeed === "mph") {
          // weather api for the daily weather
          weatherRes = await fetch(
           `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&wind_speed_unit=mph&precipitation_unit=inch`
         );
         // current weather api
          currentRes = await fetch(
           `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,precipitation,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto&wind_speed_unit=mph&precipitation_unit=inch`
         );
           //hourly Api
          hourRes = await fetch(
             `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weather_code&timezone=auto&wind_speed_unit=mph&precipitation_unit=inch`
         );
        }
        else if (unit.temperature === "celcius" && unit.precipitation === "inch" && unit.windSpeed === "kmh") {
             // weather api for the daily weather
           weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&precipitation_unit=inch`
          );
          // current weather api
           currentRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,precipitation,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto&precipitation_unit=inch`
          );
            //hourly Api
           hourRes = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weather_code&timezone=auto&precipitation_unit=inch`
          );
        }
        else if (unit.temperature === "celcius" && unit.precipitation === "millimeter" && unit.windSpeed === "mph") {
          // weather api for the daily weather
           weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&wind_speed_unit=mph`
          );
          // current weather api
           currentRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,precipitation,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto&wind_speed_unit=mph`
          );
            //hourly Api
           hourRes = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weather_code&timezone=auto&wind_speed_unit=mph`
           )
        }
        else if (unit.temperature === "fahrenheit" && unit.precipitation === "millimeter" && unit.windSpeed === "kmh") {
          // weather api for the daily weather
           weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=fahrenheit`
          );
          // current weather api
           currentRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,precipitation,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto&temperature_unit=fahrenheit`
          );
            //hourly Api
           hourRes = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weather_code&timezone=auto&temperature_unit=fahrenheit`
          );
        }
        else if (unit.temperature === "fahrenheit" && unit.precipitation === "millimeter" && unit.windSpeed === "mph") {
            // weather api for the daily weather
           weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit`
          );
          // current weather api
           currentRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,precipitation,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit`
          );
            //hourly Api
           hourRes = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weather_code&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit`
          );
        }
        else if (unit.temperature === "fahrenheit" && unit.precipitation === "inch" && unit.windSpeed === "kmh") {
          // weather api for the daily weather
           weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=fahrenheit&precipitation_unit=inch`
          );
          // current weather api
           currentRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,precipitation,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto&temperature_unit=fahrenheit&precipitation_unit=inch`
          );
            //hourly Api
           hourRes = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weather_code&timezone=auto&temperature_unit=fahrenheit&precipitation_unit=inch`
           )
        }
        else {
        // weather api for the daily weather
           weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
          );
          // current weather api
           currentRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,precipitation,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
          );
            //hourly Api
           hourRes = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weather_code&timezone=auto`
          );
        }
        
       
         if (!weatherRes.ok) {
          throw new Error("No response received for daily weather");
         }
        const weatherData = await weatherRes.json();
        console.table(weatherData.daily);
        setWeather((weather) => ({
          ...weather,
          dailyWeather: weatherData.daily,
        }));

        
        if (!currentRes) throw new Error("failed to fetch current weather");
        const currentData = await currentRes.json();
        console.log(currentData.current);
        setWeather((weather) => ({
          ...weather,
          currentWeather: currentData.current,
        }));

        
        if (!hourRes) throw new Error("failed to fetch hourly weather");
        const hourData = await hourRes.json();
        console.log(hourData);
        setWeather((weather) => ({
          ...weather,
          hourlyWeather: hourData.hourly,
        }));
      } catch ({error}) {
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    }
    fetchWeather();
  }, [
    location.currentLocation,
    unit.temperature,
    unit.precipitation,
    unit.windSpeed,
  ]);
    function handleLocation(e) {
    e.preventDefault();

    setLocation((location) => ({
      ...location,
      currentLocation: location.inputLocation,
    }));
  }
  function handleKeyPress(e) {
    if (e.key === "Enter" || e.key === "Escape") {
      setMenu(false)
      setTimeout(() => {
        e.target.blur();
      }, 1000);
    }
  }
  return (
    <div id="weather-app" onClick={dayMenu|| searchHistoryMenu||menu?()=>toggleMenu():null}>
      <div className="top">
        <Nav unit={unit} setUnit={setUnit} menu={menu} setMenu={setMenu} />
        <Header
        searchName={searchName}
          onhandleLocation={handleLocation}
          setLocation={setLocation}
          onKeyPress={handleKeyPress}
          location={location}
          searchHistoryMenu= { searchHistoryMenu}
          setSearchHistoryMenu = {setSearchHistoryMenu}

        />
        {isLoading && <img src={loading} />}
      </div>
      <div className="bottom">
        <MainContent weather={weather} country={country} unit={unit} dayMenu ={dayMenu} setDayMenu={setDayMenu} />
      </div>
      <footer>
        <div className="attribution">
          Challenge by{" "}
          <a href="https://www.frontendmentor.io?ref=challenge">
            Frontend Mentor
          </a>
          . Coded by{" "}
          <a href="https://x.com/A__Gabriel__T" target="blank">
            Asogwa Tochukwu
          </a>
          .
        </div>
      </footer>
    </div>
  );
}

export default App;
