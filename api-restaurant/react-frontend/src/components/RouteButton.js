import React from 'react'
import { useHistory } from 'react-router-dom';

function RouteButton(props) {
    let history = useHistory()
    // console.log(props.value)

    return (
        <div>
            <button onClick = { () => {
                history.push('/Second')
            }}>Make Changes to Restaurant Collection</button>
        </div>
    )
}

export default RouteButton
