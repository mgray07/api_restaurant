import React from 'react'
import { useHistory } from 'react-router-dom';

function RouteHome() {
    let history = useHistory()

    return (
        <button onClick = { () => {
            history.push('/')
        }}>Back To Search Page</button>
        
    )
}

export default RouteHome
