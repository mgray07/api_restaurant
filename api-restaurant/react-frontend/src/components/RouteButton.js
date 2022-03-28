import React from 'react'
import '../assets/RouteButton.css'
import { useHistory } from 'react-router-dom';

function RouteButton(props) {
    let history = useHistory()
    // console.log(props.value)

    return (<button onClick = { () => {
                history.push({
                pathname: '/EditPage',
                state: { valid: true }
            })
            }}>View or Change Your Restaurant List</button>       
            )
}

export default RouteButton
