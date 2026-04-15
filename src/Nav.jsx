import logo from './assets/images/logo.svg';
import dropdown from './assets/images/icon-dropdown.svg';
import settings from './assets/images/icon-units.svg';
import "./css/nav.css"
import { useState } from 'react';

function Nav({unit, setUnit, unitMenu, toggleUnitMenu}) {
    const [unitSwitch, setUnitSwitch] = useState("Switch Imperial")
    
    return (
        <nav id='navigationBar'>
            <img src={logo} alt="weather app logo" />
            <div className="units">
                <span className={`unitsButton ${unitMenu?"unitsButtonFocus":""}`} onClick={toggleUnitMenu} > <img src={settings}/> Units <img src={dropdown} />
                </span>
                {unitMenu && <form onSubmit={(e) => (e)}>
                    <h4 className='unitSwitch' onClick={()=> setUnitSwitch(unitSwitch==="Switch Metrics"? "Switch Imperial": "Switch Metrics") |setUnit(unitSwitch === "Switch Imperial"?{...unit,temperature:"fahrenheit", windSpeed:"mph",precipitation:"inch"}:{...unit,temperature:"celcius", windSpeed:"kmh",precipitation:"millimeter"})}>{unitSwitch}</h4>
                    <div className="temperature">
                        <p>Temperature</p>
                        <div className="celcius">
                            <input type="radio" value='celcius' name="Temperature" id="celcius" onChange={(e)=>setUnit({...unit,temperature: e.target.value})} checked={unit.temperature === 'celcius'} />
                            <label htmlFor="celcius">Celcius {"(°C)"}</label>
                        </div>
                        <div className="fahrenheit">
                            <input type="radio" value='fahrenheit' name="Temperature" id="fahrenheit" onChange={(e)=>setUnit({...unit,temperature: e.target.value})} checked={unit.temperature === 'fahrenheit'} />
                            <label htmlFor="fahrenheit">Fahrenheit {"(°F)"}</label>
                        </div>
                    </div>
                    <div className='hr'></div>
                    <div className="windSpeed">
                        <p>Wind Speed</p>
                        <div className="kmh">
                            <input type="radio" value='kmh' name="windSpeed" id="kmh" onChange={(e)=>setUnit({...unit,windSpeed: e.target.value})} checked ={unit.windSpeed === 'kmh'} />
                            <label htmlFor="kmh">km/h</label>
                        </div>
                        <div className="mph">
                            <input type="radio" value='mph' name="windSpeed" id="mph" onChange={(e)=>setUnit({...unit,windSpeed: e.target.value})} checked= {unit.windSpeed === 'mph'} />
                            <label htmlFor="mph">mph</label>
                        </div>
                    </div>
                    <div className='hr'></div>
                    <div className="precipitation">
                        <p>Precipitation</p>
                        <div className="millimeters">
                            <input type="radio" value='millimeter' name="precipitation" id="millimeters" onChange={(e)=>setUnit({...unit,precipitation: e.target.value})} checked={unit.precipitation === 'millimeter'} />
                            <label htmlFor="millimeters">Millimeters (mm)</label>
                        </div>
                        <div className="inches">
                            <input type="radio" value='inch' name="precipitation" id="inches" onChange={(e)=>setUnit({...unit,precipitation: e.target.value})} checked={unit.precipitation ==="inch"} />
                            <label htmlFor="inches">inches</label>
                        </div>
                    </div>
                </form>}
            </div>

        </nav>
    )
}

export default Nav
