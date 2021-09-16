import React from 'react'
import '../assets/RouteButton.css'
import { useHistory } from 'react-router-dom';

function RouteButton(props) {
    let history = useHistory()
    // console.log(props.value)

    return (<button onClick = { () => {
                history.push('/EditPage')
            }}>Make Changes to Restaurant Collection</button>       
            )
}

export default RouteButton
