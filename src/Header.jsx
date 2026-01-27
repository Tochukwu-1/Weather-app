import React from 'react'
import ReactDom from 'react-dom/client'


function Header({onhandleLocation, location, setLocation}) {
    return (
        <header>
            <h1>How's the sky looking today?</h1>
            <form onSubmit={(e) => onhandleLocation(e)}>
            <input type="text" placeholder='Search for a place...' value={location.inputLocation} onChange={(e)=>setLocation({...location, inputLocation: e.target.value})}/>
            <button>Search</button>
            </form>
        </header>
    )
}

export default Header
