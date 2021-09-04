import React from 'react'
import HomePage from './HomePage'
import EditPage from './EditPage'
import axios from 'axios'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            parentResults: [],
        }
    }

    componentWillMount() {
        axios
          .get('http://127.0.0.1:5000/')
          .then(res => {
            this.setState({parentResults: res.data.restaurants_backend})
          })
          .catch(err => console.error(err));
    }
    
    

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path = '/' component= {HomePage}>
                            <HomePage value = {this.state.parentResults} /> 
                        </Route>
                        <Route exact path = '/EditPage' component = {EditPage}> 
                            <EditPage value = {this.state.parentResults} />
                        </Route>
                    </Switch>
                </Router>
            </div>

        )
    }
    
}

export default App

