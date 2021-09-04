import React from 'react'
import RouteHome from './RouteHome'
import axios from 'axios'
import {setState} from 'react'
import Dropdown from 'react-dropdown'
import RestaurantCard from './RestaurantCard'

class EditPage extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      allResults: this.props.value
    }
  }

  componentWillMount() {
    axios
      .get('http://127.0.0.1:5000/')
      .then(res => {
        this.setState({allResults: res.data.restaurants_backend})
        this.showAll()
      })
      .catch(err => console.error(err));
  }

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

  showAll = () => {
    //console.log(this.state.allResults)
    let showAllOutput = document.getElementById('showAllId')
    let listOutput = document.createElement('div')
    let emptyCase = document.createElement('h5')
    emptyCase.textContent = 'No Restaurants Added Yet'
    let i = 0
    
    this.state.allResults.map((result) => {
      //console.log(<RestaurantCard name = {result.name} style = {result.style} tags = {result.tags}/>)
      let tmp1 = this.restaurantCard(result.name, result.style, result.tags)
      let tmp2 = <RestaurantCard name = {result.name} style = {result.style} tags = {result.tags}/>
      //console.log(result.name)
      i = i+1
      //let temp = document.createElement('h5')
      //temp.textContent = JSON.stringify(result)
      //listOutput.appendChild(temp)
      listOutput.appendChild(tmp1)
      // return JSON.stringify(result)
    })
    if (i === 0) {
      listOutput.appendChild(emptyCase)
    }
    while (showAllOutput.firstChild) {
      showAllOutput.removeChild(showAllOutput.lastChild)
    }
    showAllOutput.appendChild(listOutput)
  }

  deleteData = () => {
    if (document.getElementById('deleteId').value === '') {
      return
    }
    axios
    .delete('http://127.0.0.1:5000/', {
      params: {
        name: document.getElementById("deleteId").value.trim()
      }
    })
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  postData = () => {
    if (document.getElementById('name').value === '' || document.getElementById('style').value === '' || document.getElementById('tags').value === '') {
      return
    }
    let tempo = document.getElementById("tags").value.split(',')
    let i = 0
    for (i=0; i< tempo.length; i++) {
      tempo[i] = tempo[i].trim()
    }
    axios
    .post('http://127.0.0.1:5000/', {
      data: {
        name: document.getElementById("name").value.trim(),
        style: document.getElementById("style").value.trim(),
        tags: tempo
      }
    })
    .then(res => console.log(res))
    .catch(err => console.error(err));
  }


  

  render () {
    const options = ['name', 'style', 'tags']
    return (
      <div>
        <RouteHome />
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
        {/* <RestaurantCard name = 'aasdasd' style = 'b' tags = 'c' /> */}
        <br/>
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
        <div id = 'showAllId'></div>
        <br />
        
      </div>
    )
  }
   
}

export default EditPage
