import React from 'react'
import ReactDom from 'react-dom/client'
import errorImg from '../assets/images/icon-error.svg'
import retryImg from '../assets/images/icon-retry.svg';
import '../css/ApiError.css'


function ApiError({setApiError}) {
    return (
        <div className='apiError'>
            <img src={errorImg} alt="error image" />
            <h1>Something went wrong</h1>
            <p>we couldn't connect to the server(API error). Please try <br />again in few moments.</p>
            <button onClick={()=>setApiError(false)}><img src={retryImg} alt="" /> Retry</button>
        </div>
    )
}

export default ApiError
