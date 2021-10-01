import React, { Component } from 'react'
import RouteHome from './RouteHome.js'
import { useLocation } from "react-router-dom";
import HomePage from './HomePage.js'
import axios from 'axios';
import '../assets/FarewellPage.css'


export function FarewellPage(props) {
    
    let location = useLocation();
    
    try{
        console.log(location.state.valid)
        
     }
     catch {
         console.log('xD')
         return (<div>
             <h1>INVALID PAGE</h1>
             <RouteHome/> 
         </div>)
         //history.push('/')
     }

    //props.changeSignIn1();
    //location.state.changeSignIn1()
    axios.patch('http://127.0.0.1:5000/', {
        data: {
            userID: 'restaurants'
        }
    })
    .then(res => console.log(res))
    .catch(err => console.error(err));
    
        return (
            <div className = 'entirePage'>
            <div className = 'Header'>
                <h1>Restaurant Finder</h1>
            </div>
            
            <div className = 'farewellBody'>
                <h1 className = 'goodbyeMsg'>Farewell! </h1>
                <div className = 'routeButtons'> <RouteHome />  </div> 
            </div>
        
        
        </div>
        )
}

export default FarewellPage


  
