
import React, { Component } from 'react'
import HomePage from './HomePage.js'
import RouteHome from './RouteHome.js'
import RouteButton from './RouteButton.js';
import { useLocation, useHistory}  from "react-router-dom";
import axios from 'axios';
import '../assets/GreetingPage.css'



export function GreetingPage(props) {
    //let history = useHistory()
    let location = useLocation();

    //change sign in upon getting to greeting page
    //props.changeSignIn1() 
    //location.state.changeSignIn1()
    // if(location.state.googleValue == null){
    //     console.log('hi')
    //     history.push('/')
    
    try{
       console.log(location.state.googleValue)
       
    }
    catch {
        console.log('xD')
        return (<div>
            <h1>INVALID PAGE</h1>
            <RouteHome/> 
        </div>)
        //history.push('/')
    }
   
    console.log(location.state.googleValue)
    console.log(location.state.googlePicture)
    console.log(location.state.googleID)
    //props.changeSignIn()

    axios.patch('http://127.0.0.1:5000/', {
        data: {
            userID: location.state.googleID
        }
    })
    .then(res => console.log(res))
    .catch(err => console.error(err));


    

    return (
        <div className = 'entirePage'>
            <div className = 'Header'>
                <h1>Restaurant Finder</h1>        
            </div>
            <div className = 'greetingBody'>
                <h1>Welcome to Restaurant Finder </h1>
                <div>
                    <h1 className = 'profileName'>{location.state.googleValue}</h1>
                    <img className = 'profilePicture' src = {location.state.googlePicture}/> 
                </div>
            </div>
            <div className = 'routeButtons'>
                <RouteHome />
                <RouteButton/>
            </div>
            
        </div>
    )
    }

export default GreetingPage
    