import React from 'react'
import ReactDom from 'react-dom/client'
import logo from './assets/images/logo.svg';
import dropdown from './assets/images/icon-dropdown.svg';


function Nav() {
    return (
        <nav id='navigationBar'>
            <img src={logo} alt="weather app logo" />
            <span>Units <img src={dropdown} /></span>

        </nav>
    )
}

export default Nav
