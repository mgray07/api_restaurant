import React from 'react'
import { useHistory } from 'react-router-dom'


function RouteDirections() {
    let history = useHistory()
    
    return (<button onClick = { () => {
        history.push({
        pathname: '/DirectionPage',
        // state: { valid: true }
    })
    }}>Get Directions</button> // get directions to + restaurantName       
    )
}

export default RouteDirections
