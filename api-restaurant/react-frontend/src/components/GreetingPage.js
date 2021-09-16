
import React, { Component } from 'react'
import HomePage from './HomePage.js'
import RouteHome from './RouteHome.js'
import { useLocation } from "react-router-dom";


export function GreetingPage() {
    
    let location = useLocation();
    console.log(location.state.googleValue)
    console.log(location.state.googlePicture)

    return (
        <div>
            <h5>
                Hello: {location.state.googleValue}              
            </h5>                
            <img src = {location.state.googlePicture}/> 
            <h5>
            wow, looking snazzy
            </h5>
            <h1>
            GREETINGS BRUV
            </h1>
            <div className = 'routeHome'>
        <RouteHome />
    </div>
        </div>
    )
    }

export default GreetingPage
    