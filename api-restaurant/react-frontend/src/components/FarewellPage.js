import React, { Component } from 'react'
import RouteHome from './RouteHome.js'
import { useLocation } from "react-router-dom";
import HomePage from './HomePage.js'


export function FarewellPage() {
    
    

    
        return (
            <div>
            <h5>
                GOOD BYE!!!!!:              
            </h5>                
                      
            <h1>
                bye
            </h1>
            <div className = 'routeHome'>
                <RouteHome />
            </div>
        </div>
        )
}

export default FarewellPage


  
