import React from 'react'
import { useHistory } from 'react-router-dom';

function RouteGreeting() {
    let history = useHistory()
    console.log('greeting?')
    return history.push('/GreetingPage')
    
    // return (
    //     <button onClick = { () => {
    //         history.push('/')
    //     }}>Back To Search Page</button>
        
    // )
}

export default RouteGreeting
