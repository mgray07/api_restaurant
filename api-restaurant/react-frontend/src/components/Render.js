import React from 'react'
import App from './App'
import Second from './Second'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 

class Render extends React.Component {
    render(props) {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path = '/' component= {App}/>
                        <Route exact path = '/Second' component = {Second}/> 
                    </Switch>
                </Router>
            </div>
            
        )
    }
    
}

export default Render

