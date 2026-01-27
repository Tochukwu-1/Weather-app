import { useEffect, useState } from "react";
import Nav from "./Nav.jsx";
import Header from "./Header.jsx";
import MainContent from "./MainContent.jsx";
import "./index.css";
import loading from './assets/images/icon-loading.svg';

function App() {
  const [location, setLocation]= useState({inputLocation:'America', currentLocation: ""})
  const [isLoading, setIsLoading] = useState(false)
  const [weather, setWeather] =useState({dailyweather: [], hourlyWeather:[]})


function handleLocation(e){
  e.preventDefault()
  setLocation({...location,currentLocation: location.inputLocation})
  // setLocation('')
}

  useEffect(() => {
  async function fetchWeather(){
    try{

      // location api to get longitude and latitude of desired location
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location.currentLocation}`)
      setIsLoading(true)
      if(!geoRes) throw new Error('Failed to fetch location')
        const geoData = await geoRes.json()
      console.log(geoData.results[0])
      const locationParameters = geoData.results[0];
      const {latitude:lat, longitude:long} = locationParameters;
      
      // weather api for the daily weather
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?longitude=${lat}&latitude=${long}&daily=weather_code,temperature_2m_min,temperature_2m_max&timezone=auto`)
      if(!weatherRes.ok){
        throw new Error("No response received")
      }
      const weatherData = await weatherRes.json()
      console.table(weatherData.daily)
      setWeather(weather => ({...weather, dailyWeather: weatherData.daily}))
    } catch (error){
      console.log(error)
    } finally{
      setIsLoading(false)
    }

  }
  fetchWeather()
}, [location.currentLocation])
  return (
    <div id="weather-app">
      <div className="top">
        <Nav />
        <Header onhandleLocation={handleLocation} setLocation={setLocation} location={location}/>
        {isLoading && <img src={loading}/>}
      </div>
      <div className="bottom">
        <MainContent weather={weather} />
      </div>
      <footer>
        <div className="attribution">
          Challenge by{" "}
          <a href="https://www.frontendmentor.io?ref=challenge">
            Frontend Mentor
          </a>
          . Coded by <a href="https://x.com/A__Gabriel__T" target="blank">Asogwa Tochukwu</a>.
        </div>
      </footer>
    </div>
  );
}

export default App;
