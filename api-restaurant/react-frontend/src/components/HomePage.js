import axios from 'axios'
import React from 'react';
import {setState} from 'react'
import Dropdown from 'react-dropdown'
// import 'react-dropdown/style.css'
import '../assets/Dropdown.css'
import { useHistory } from 'react-router';
import RouteButton from './RouteButton'
import '../assets/HomePage.css'
import Modal from 'react-modal';
import GoogleLogin from 'react-google-login'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import GreetingPage from './GreetingPage';
import SignInCheck from './SignInCheck';


class HomePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      style: '',
      tags: '',
      signIn: true,
      isLoading: true,
      googleName: this.props.googleValue,
      allResults: this.props.value,
      sortedResults: [],
    };
    
    //this.getData = this.getData.bind(this)
    this.setName = this.setName.bind(this)
    this.setStyle = this.setStyle.bind(this)
    this.setTags = this.setTags.bind(this)
    this.searchType = this.searchType.bind(this)
    // this.random = this.random.bind(this)


    // console.log('inside homepage.js')
    // console.log(this.state.signIn)
    // this.props.changeSignIn()
    // console.log(this.props.signIn)
  }
  

  componentWillUpdate(nextProps, nextState) {  
    localStorage.setItem('signIn', JSON.stringify(nextState.signIn))
  }

  componentWillMount() {
    localStorage.getItem('signIn') && this.setState({
      signIn: JSON.parse(localStorage.getItem('signIn')),
      isLoading: false
    })
  }

  
  setName = (event) => {
    this.setState({name: event.target.name});
    //console.log(event.target.name);
    //console.log(this.state.name)
  }
  setStyle = (event) => {
      this.setState({style: event.target.style});
      //console.log(event.target.style);
      //console.log(this.state.style)
  }
  setTags = (event) => {
    this.setState({tags: event.target.tags});
    //console.log(this.state.tags)
    //console.log(event.target.tags);
  }

  sortData = () => {

    let resultArray = this.state.sortedResults
    let search1 = document.getElementById('newSearchLabel').textContent
    let dataGet
    let finalList = []
    if (search1 === "Search Name:") {
      dataGet = "name"
    }
    else if (search1 === "Search Style:") {
      dataGet = "style"
    }
    else if (search1 === "Search Tags:") {
      dataGet = "tags"
    }
    for(let i = 0; i < resultArray.length; i++) {
      if (dataGet === "tags") {
        let lowerTags = resultArray[i][dataGet].map((data) => data.toString().toLowerCase())
        let searchInput = document.getElementById('newSearchInput').value
        //console.log(resultArray[i][dataGet].includes(searchInput))
        //console.log(searchInput.trim())
        if (lowerTags.includes(searchInput.trim().toString().toLowerCase())) {
          finalList.push(resultArray[i])
        }
      }
      else if (resultArray[i][dataGet].toString().toLowerCase() === document.getElementById('newSearchInput').value.trim().toString().toLowerCase()) {
        finalList.push(resultArray[i])
      }
    }
    this.setState({sortedResults: finalList})
    if (finalList.length == 0) {
      console.log(`No Results Matching ${document.getElementById('newSearchInput').value.trim()}`)
    }
    else {
      console.log(finalList)
    }
    this.showOutput(finalList)
  }
  
  getData = (event) => {
    if (document.getElementById('newSearchInput').value === '') {
      return
    }
    //console.log(event)
    let dog = axios.get('http://127.0.0.1:5000/')
    .then(res => {
      this.setState({sortedResults: res.data.restaurants_backend})
      document.getElementById("showOutputId").style.display = "block"
      this.sortData()
    })

  }

  // random = () => {
  //   console.log('xD')
  // }
  searchType = (event) => {
    
    let labelText
    let inputPlaceholder
    let getType

    if (event.value === 'name') {
      labelText = "Search Name:"
      inputPlaceholder = "Name to Search"
      getType = "GET BY NAME"
    }
    else if (event.value === 'style') {
      labelText = "Search Style:"
      inputPlaceholder = "Style to Search"
      getType = "GET BY STYLE"
    }
    else if (event.value === 'tags') {
      labelText = "Search Tags:"
      inputPlaceholder = "Tags to Search"
      getType = "GET BY TAGS"
    }
   
    let  typeSearch = document.getElementById('typeOfSearch')
    let  newSearchLabel = document.createElement('label') 
    // let  newSearchLabel = document.createElement(
    //   'label',
    //   {id: 'newSearchLabel'},
    //   {textContent: labelText}
    // )
    newSearchLabel.textContent = labelText //1
    newSearchLabel.id = "newSearchLabel"
   
      let newSearchInput = document.createElement('input')
      // let newSearchInput = document.createElement(
      //   'input',
      //   {type: 'text'},
      //   {placeholder: inputPlaceholder},
      //   {id: 'newSearchInput'}
      //   )
      newSearchInput.type = "text"
      newSearchInput.placeholder = inputPlaceholder //2
      newSearchInput.id = "newSearchInput"
      // newSearchInput.onchange = this.random
      // newSearchInput.required = true

      

      let newSearchButton = document.createElement('button')
      // let newSearchButton = document.createElement(
      //   'button',
      //   {onClick: this.getData},
      //   {textContent: getType},
      //   {id: 'newSearchButton'}
      // )

      
      
    
      newSearchButton.textContent = getType
      // newSearchButton.onClick = this.test
      newSearchButton.onclick = this.getData
      newSearchButton.id = "newSearchButton"
    

      // newSearchButton.id = "newSearchButton"

      while (typeSearch.firstChild) {
        typeSearch.removeChild(typeSearch.lastChild)
      }
      // ReactDOM.render(newSearchInput, newSearchLabel)
      // ReactDOM.render(newSearchButton, newSearchLabel)
      // ReactDOM.render(newSearchLabel, typeSearch)
      newSearchLabel.appendChild(newSearchInput)
      // newSearchLabel.appendChild(newSearchButton)
      typeSearch.appendChild(newSearchLabel) //appending to the div typeOfSearch
      typeSearch.appendChild(newSearchButton)
  }
  

  restaurantCard = (name, style, tags) => {
    let restaurantCard = document.createElement('div')
    restaurantCard.id = 'restaurantCardId'

    let restaurantName = document.createElement('h5')
    restaurantName.id = 'restaurantNameId'
    let restaurantStyle = document.createElement('h5')
    restaurantStyle.id = 'restaurantStyleId'
    let restaurantTags = document.createElement('h5')
    restaurantTags.id = 'restaurantTagsId'
    
    


    restaurantName.textContent = `Name: ${name}`
    restaurantStyle.textContent = `Style: ${style}`
    restaurantTags.textContent = `Tags: ${tags}`

    restaurantCard.appendChild(restaurantName)
    restaurantCard.appendChild(restaurantStyle)
    restaurantCard.appendChild(restaurantTags)

    return restaurantCard
  }
  showOutput = () => {

    let showOutput = document.getElementById('showOutputId')
    let listOutput = document.createElement('div')
    listOutput.id = 'listOutputId'
    let emptyCase = document.createElement('h5')
    emptyCase.textContent = `No Result Matching ${document.getElementById('newSearchInput').value.trim()}`
    let i = 0
    
    this.state.sortedResults.map((result) => {
      i = i+1
      //let temp = document.createElement('h5')
      let tmp1 = this.restaurantCard(result.name, result.style, result.tags)
      //temp.textContent = JSON.stringify(result)
      listOutput.appendChild(tmp1)
      // return JSON.stringify(result)
    })
    if (i === 0) {
      listOutput.appendChild(emptyCase)
    }
    while (showOutput.firstChild) {
      showOutput.removeChild(showOutput.lastChild)
    }
    showOutput.appendChild(listOutput)
  }

  responseGoogle = (response) => {
    console.log('xDdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd')
    this.setState({googleName: response.profileObj.name})
    
    
    // console.log('foobar')
  }

  changeSignIn = () => {
      console.log('inside changesignin')
      console.log('before', this.state.signIn)
      let temp = this.state.signIn
      this.setState({signIn: !temp})  
  };
  
  changeSignIn2 = () => {
    this.props.changeSignIn1()
  }

  render() {
    const options = ['name', 'style', 'tags']
    const defaultOption = options[0] 
    return (
      
    <div className = "EntirePage">

      {/* <div>
        <Router>
          <Switch>
            <Route exact path = '/GreetingPage' component = {GreetingPage}>
              <GreetingPage googleValue = {this.state.googleName} />
            </Route>
          </Switch>
        </Router>
     </div>    */}
      <div className = 'topStuff'>
      <div className = 'routeButton'>
          <RouteButton ></RouteButton>  
      </div>
      <div>
        {console.log('homepagejs', this.state.signIn)}
        <SignInCheck changeSignIn2 = {this.changeSignIn2} changeSignIn = {this.changeSignIn} signIn = {this.state.signIn}/>
      </div>
      {/* <div id='google'>
        <GoogleLogin clientId = '279700457129-jutmcs5c0ptfhjh2ss06kq7jki0d38se.apps.googleusercontent.com'
        buttonText = 'Sign In'
        onSuccess = {this.responseGoogle}
        onFailure = {this.responseGoogle}
        // redirectUri = 'http://localhost:3000/GreetingPage/'
        // uxMode="redirect"
        cookiePolicy = 'single_host_origin'/>
        
      </div> */}
      
      </div>
      
      <div className = 'Header'>
        <h1  >Restaurant Finder</h1>        
      </div>

      <h2 className = "Method">
        Choose Your Search Method
      </h2>
      
      <Dropdown options={options} onChange={this._onSelect} id = "dropdown-menu" placeholder = "Select a Search Method" onChange={this.searchType}/>

      <div id='typeOfSearch'></div>
      <div id = 'showOutputId'></div>
      
    </div>      
    )    
  }
}

export default HomePage
