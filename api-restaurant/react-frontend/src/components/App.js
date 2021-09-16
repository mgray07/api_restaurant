import React from 'react'
import HomePage from './HomePage'
import EditPage from './EditPage'
import GreetingPage from './GreetingPage'
import FarewellPage from './FarewellPage'
import axios from 'axios'
import {setState} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 




class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            parentResults: [],
            currentUserId: '',
            googleName: '',
        }
    };

    componentWillMount() {
        
        axios
          .get('http://127.0.0.1:5000/')
          .then(res => {
            this.setState({parentResults: res.data.restaurants_backend})
            console.log(res)
          })
          .catch(err => console.error(err));
        
        console.log('inside app.js')
        
    };

    // componentDidMount() {
    //     this.setState((state) => ({
    //         signIn: !state.signIn
    //     }), () => {console.log('after', this.state.signIn)})
    // }
    
    

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path = '/' component= {HomePage}>
                            <HomePage googleValue = {this.state.googleName} value = {this.state.parentResults} /> 
                        </Route>
                        <Route exact path = '/EditPage' component = {EditPage}> 
                            <EditPage value = {this.state.parentResults} />
                        </Route>
                        <Route exact path = '/GreetingPage' component = {GreetingPage}>
                            <GreetingPage />
                        </Route>
                        <Route exact path = '/FarewellPage' component = {FarewellPage}>
                            <FarewellPage />
                        </Route>
                    </Switch>
                </Router>
            </div>

        )
    }
    
}

export default App

