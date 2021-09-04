import axios from 'axios'
import React from 'react';
import {setState} from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { useHistory } from 'react-router';
import RouteButton from './RouteButton'


let resy;
let resy2 = 'fffff';
let res

// function getData(e) {

  
//   let isFinished = false
//   let axiosData

//   async function getmyStuff() {
//    let res = await axios.get('http://127.0.0.1:5000/')
//     return res, true
//   }
//   axiosData = getmyStuff()[0]
//   isFinished = getmyStuff()[1]
//   while (isFinished == false) {
//     continue
//   }
//   console.log(axiosData)
  
//   let search1 = document.getElementById('newSearchLabel').textContent
//   let dataGet
//   let finalList
//   if (search1 === "Search Name:GET BY NAME") {
//     dataGet = "name"
//   }
//   else if (search1 === "Search Style:GET BY STYLE") {
//     dataGet = "style"
//   }
//   else if (search1 === "Search Tags:GET BY TAGS") {
//     dataGet = "tags"
//   }
//   for(let i = 0; i < res.data.restaurants_backend.lenth(); i++) {
//     if (res.data.restaurants_backend[i][dataGet] === document.getElementById('newSearchInput').value) {
//       finalList.append(res.data.restaurants_backend[i])
//     }
//   }
//   console.log({finalList})
// }

class HomePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      style: '',
      tags: '',
      allResults: this.props.value,
      sortedResults: [],
    };
    
    //this.getData = this.getData.bind(this)
    this.setName = this.setName.bind(this)
    this.setStyle = this.setStyle.bind(this)
    this.setTags = this.setTags.bind(this)
    this.searchType = this.searchType.bind(this)
  }
  

  

  // componentWillMount() {
  //   // axios
  //   //   .get('http://127.0.0.1:5000/')
  //   //   .then(res => {
  //   //     this.setState({allResults: res.data.restaurants_backend})
  //   //     this.showAll()
  //   //   })
  //   //   .catch(err => console.error(err));
  //   // console.log(this.props.value)
  //   // console.log(this.state.allResults)
  //   console.log('hello')
    
  // }
  
  
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
        let lowerTags = resultArray[i][dataGet].map((data) => data.toLowerCase())
        let searchInput = document.getElementById('newSearchInput').value
        //console.log(resultArray[i][dataGet].includes(searchInput))
        //console.log(searchInput.trim())
        if (lowerTags.includes(searchInput.trim().toLowerCase())) {
          finalList.push(resultArray[i])
        }
      }
      else if (resultArray[i][dataGet].toLowerCase() === document.getElementById('newSearchInput').value.trim().toLowerCase()) {
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
    //console.log(event)
    let dog = axios.get('http://127.0.0.1:5000/')
    .then(res => {
      this.setState({sortedResults: res.data.restaurants_backend})
      this.sortData()
    })

  }
  
  // getAll = (e) => {
  //   axios
  //     .get('http://127.0.0.1:5000/')
  //     .then(res => {
  //       this.setState({allResults: res.data.restaurants_backend})
  //       this.showAll()
  //     })
  //     .catch(err => console.error(err));
  //   console.log(this.state.allResults)
  //   console.log(this.props.value)
  // }
  
  // postData = () => {
  //   if (document.getElementById('name').value === '' || document.getElementById('style').value === '' || document.getElementById('tags').value === '') {
  //     return
  //   }
  //   let tempo = document.getElementById("tags").value.split(',')
  //   let i = 0
  //   for (i=0; i< tempo.length; i++) {
  //     tempo[i] = tempo[i].trim()
  //   }
  //   axios
  //   .post('http://127.0.0.1:5000/', {
  //     data: {
  //       name: document.getElementById("name").value.trim(),
  //       style: document.getElementById("style").value.trim(),
  //       tags: tempo
  //     }
  //   })
  //   .then(res => console.log(res))
  //   .catch(err => console.error(err));
  // }

  // deleteData = () => {
  //   if (document.getElementById('deleteId').value === '') {
  //     return
  //   }
  //   axios
  //   .delete('http://127.0.0.1:5000/', {
  //     params: {
  //       name: document.getElementById("deleteId").value.trim()
  //     }
  //   })
  //     .then(res => console.log(res))
  //     .catch(err => console.error(err));
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
    let  newSearchLabel = document.createElement('label') //<p1></p1>
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
  
  // showAll = () => {
  //   let showAllOutput = document.getElementById('showAllId')
  //   let listOutput = document.createElement('div')
  //   let emptyCase = document.createElement('h5')
  //   emptyCase.textContent = 'No Restaurants Added Yet'
  //   let i = 0
    
  //   this.state.allResults.map((result) => {
  //     i = i+1
  //     let temp = document.createElement('h5')
  //     temp.textContent = JSON.stringify(result)
  //     listOutput.appendChild(temp)
  //     // return JSON.stringify(result)
  //   })
  //   if (i === 0) {
  //     listOutput.appendChild(emptyCase)
  //   }
  //   while (showAllOutput.firstChild) {
  //     showAllOutput.removeChild(showAllOutput.lastChild)
  //   }
  //   showAllOutput.appendChild(listOutput)
  // }

  restaurantCard = (name, style, tags) => {
    let restaurantCard = document.createElement('div')

    let restaurantName = document.createElement('h5')
    let restaurantStyle = document.createElement('h5')
    let restaurantTags = document.createElement('h5')

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
  
  
  render() {
    const options = ['name', 'style', 'tags']
    const defaultOption = options[0]
    
    
    return (
    <div>
      <div>
        <h2>
          Choose Your Search Method:
        </h2>
        <br />
        <Dropdown options={options} onChange={this._onSelect} id = "dropdown-menu" placeholder = "Select a Search Method" onChange={this.searchType}/>

        <div id = 'typeOfSearch'>
        </div>
        <div id =  'showOutputId'>
        </div>
        <br />

        <br />
        <div id = 'showAllId'></div>
        <br />
        
        <br /> 
       
        <RouteButton ></RouteButton>    
      </div>   
    </div>
    )    
  }
}

export default HomePage
