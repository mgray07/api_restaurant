import axios from 'axios'
import React from 'react';
import {setState} from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

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

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      style: '',
      tags: '',
      allResults: [],
      sortedResults: []
    };
    
    this.setData = this.setData.bind(this)
    this.setName = this.setName.bind(this)
    this.setStyle = this.setStyle.bind(this)
    this.setTags = this.setTags.bind(this)
    this.searchType = this.searchType.bind(this)
  }
  // state = {
  //   name: '',
  //   style: '',
  //   tags: '',
  //   results: [],
  //   test: 'd'
  // };
  
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
      if (resultArray[i][dataGet] === document.getElementById('newSearchInput').value) {
        finalList.push(resultArray[i])
      }
    }
    this.setState({sortedResults: finalList})
    if (finalList.length == 0) {
      console.log(`No Results Matching ${document.getElementById('newSearchInput').value}`)
    }
    else {
      console.log(finalList)
    }
    
    
  }

  setData = (event) => {
    //console.log(event)
    let dog = axios.get('http://127.0.0.1:5000/')
    .then(res => {
      this.setState({sortedResults: res.data.restaurants_backend})
    })
    
    this.sortData()
  }

  getAll = (e) => {
    axios
      .get('http://127.0.0.1:5000/')
      .then(res => {
        this.setState({allResults: res.data.restaurants_backend})
      })
      .catch(err => console.error(err));
      console.log(this.state.allResults)
  }
  
  postData = () => {
    if (document.getElementById('name').value === '' || document.getElementById('style').value === '' || document.getElementById('tags').value === '') {
      return
    }
    console.log('hi')
    axios
    .post('http://127.0.0.1:5000/', {
      data: {
        name: document.getElementById("name").value,
        style: document.getElementById("style").value,
        tags: document.getElementById("tags").value.split(',')
      }
    })
    .then(res => console.log(res))
    .catch(err => console.error(err));
  }

  deleteData = () => {
    if (document.getElementById('deleteId').value === '') {
      return
    }
    axios
    .delete('http://127.0.0.1:5000/', {
      params: {
        name: document.getElementById("deleteId").value
      }
    })
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

 
  
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
      newSearchButton.onclick = this.setData
      

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
        <br />

        <button onClick={this.getAll}>
          GET ALL
        </button>
        <br />
        <form >
          <label>
            Name of Restaurant:
            <input type="text" placeholder = "Restaurant Name" id = "name" onChange ={this.setName} required/>
          </label>   
            <br />
          <label>
            Style of Restaurant:
            <input type="text" placeholder = "Restaurant Style" id = "style" onChange ={this.setStyle} required/>
          </label>  
          <br />
          <label>
            Tags:
            <input type="text" placeholder = "Tags comma separated" id = "tags" onChange ={this.setTags} required/>
          </label>
          <br />
          <button onClick={this.postData}>POST</button>  
          {/* <input type="submit" value="POST" /> */}
          <br /> 
        </form>
        <br /> 
       <form>
         <label>
           Restaurant To Delete:
           <input type="text" placeholder = "Desired Deleted Restaurant" id = "deleteId" onChange ={this.setName} required/>
         </label>
         <br />
       <button onClick={this.deleteData}>
          DELETE
        </button>
        <br />
       </form>    
      </div>   
    </div>
    )    
  }
}

export default App
