import React from 'react'
import HomePage from './HomePage'
import EditPage from './EditPage'
import GreetingPage from './GreetingPage'
import FarewellPage from './FarewellPage'
import DirectionPage from './DirectionPage'
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
            isLoading: true,
            signIn1: false
        }
    };

    componentWillUpdate(nextProps, nextState) {  
        // axios
        //   .get('http://127.0.0.1:5000/')
        //   .then(res => {
        //     this.setState({parentResults: res.data.restaurants_backend})
        //     console.log(res)
        //   })
        //   .catch(err => console.error(err));
        localStorage.setItem('signIn1', JSON.stringify(nextState.signIn1))
      }

    componentWillMount() {
        
        axios
          .get('http://127.0.0.1:5000/')
          .then(res => {
            this.setState({parentResults: res.data.restaurants_backend})
            console.log(res)
          })
          .catch(err => console.error(err));

        localStorage.getItem('signIn1') && this.setState({
            signIn1: JSON.parse(localStorage.getItem('signIn1')),
            isLoading: false
        })
        
        console.log('inside app.js')
        
    };

    // componentDidMount() {
    //     this.setState((state) => ({
    //         signIn: !state.signIn
    //     }), () => {console.log('after', this.state.signIn)})
    // }
    
    changeSignIn1 = () => {
        let temp = this.state.signIn1
        this.setState({signIn1: !temp})
    }

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path = '/' component= {HomePage}>
                            <HomePage changeSignIn1 = {this.changeSignIn1} googleValue = {this.state.googleName} value = {this.state.parentResults} /> 
                        </Route>
                        <Route exact path = '/EditPage' component = {EditPage}> 
                            <EditPage signIn1 = {this.state.signIn1} value = {this.state.parentResults} />
                        </Route>
                        <Route exact path = '/GreetingPage' component = {GreetingPage}>
                            <GreetingPage  />
                        </Route>
                        <Route exact path = '/FarewellPage' component = {FarewellPage}>
                            <FarewellPage />
                        </Route>
                        <Route exact path = '/DirectionPage' component = {DirectionPage}>
                            <DirectionPage />
                        </Route>



                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App

