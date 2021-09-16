import React from 'react'
import RouteHome from './RouteHome'
import RouteGreeting from './RouteGreeting'
import axios from 'axios'
import {setState} from 'react'
// import Dropdown from 'react-dropdown'
import "../assets/EditPage.css"
import RestaurantCard from './RestaurantCard'
import Modal from 'react-bootstrap-modal'
import GoogleLogin from 'react-google-login'
// let Modal = require('react-bootstrap-modal')
//const bootstrap = require('bootstrap')

class EditPage extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      allResults: this.props.value,
      modalOpen: false
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

  handleShowMore = () => {
    // <Modal>
      
    // </Modal>
  //   let myModal = document.createElement('div')
  //   myModal.innerHTML = `
  //   <div class="modal" tabindex="-1">
  //   <div class="modal-dialog">
  //     <div class="modal-content">
  //       <div class="modal-header">
  //         <h5 class="modal-title">Modal title</h5>
  //         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  //       </div>
  //       <div class="modal-body">
  //         <p>Modal body text goes here.</p>
  //       </div>
  //       <div class="modal-footer">
  //         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  //         <button type="button" class="btn btn-primary">Save changes</button>
  //       </div>
  //     </div>
  //   </div>
  // </div>

 
  //   `
  //   // document.getElementById('showAllOutput').appendChild(myModal)
  //   var modal = new Modal(myModal.querySelector('.modal'));
  //   modal.show();

    // let test = document.createElement('div')
    // test.innerHTML = 
    // `
    //   <Modal isOpen={true}>
    //    <h2>test</h2>
    //   </Modal>
    // `
    // let test2 = document.getElementById('listOutputId')
    // test2.append(test)
  // }

  // test = () => {
  //   let test1 = document.getElementById('restaurantNameId')
  //   test1.innerHTML = `<h1>testing</h1>`
  // }
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
    
    //let tagsDiv = document.createElement('div')
    //tagsDiv.id = 'tagsDivId'
    let openMoreDiv = document.createElement('div')
    let openMore = document.createElement('button') 
    // openMore.onclick = this.handleShowMore
    

    
    openMore.id = 'openMoreId'
    openMoreDiv.id = 'openMoreDivId'
    openMore.textContent = 'Show More'
    openMoreDiv.appendChild(openMore)
    // tagsDiv.appendChild(restaurantTags)
    // tagsDiv.appendChild(openMore)
    
    

    
    
    restaurantCard.appendChild(restaurantName)
    restaurantCard.appendChild(restaurantStyle)
    restaurantCard.appendChild(restaurantTags)
    restaurantCard.appendChild(openMoreDiv)
    

    return restaurantCard
  }

  showAll = () => {
    //console.log(this.state.allResults)
    let showAllOutput = document.getElementById('showAllId')
    let listOutput = document.createElement('div')
    listOutput.id = 'listOutputId'
    let emptyCase = document.createElement('h5')
    emptyCase.textContent = 'No Restaurants Added Yet'
    let i = 0
    
    this.state.allResults.map((result) => {
      //console.log(<RestaurantCard name = {result.name} style = {result.style} tags = {result.tags}/>)
      let tmp1 = this.restaurantCard(result.name, result.style, result.tags)
      //let tmp2 = <RestaurantCard name = {result.name} style = {result.style} tags = {result.tags}/>
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
    console.log(document.getElementById('deleteId').value)
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
  
  
  responseGoogleSuccess = (response) => {
    
    console.log(response)
    console.log(response.profileObj)
  }

  responseGoogleFail = (response) => {
    // let history = useHistory()
    // history.push('/GreetingPage')
    // console.log('greeting?')
    
    console.log(response)
    console.log(response.profileObj)
  }
  

  render () {
    const options = ['name', 'style', 'tags']
    return (
      <div className = 'entirePage'>
        <div className = 'routeHome'>
          <RouteHome />
        </div>
        
        <div className = 'Header'>
          <h1>Restaurant Finder</h1>
        </div>
        <div className = "body">
          <div className = 'postAndDelete'>
            <form className = 'postForm'>
              <label className = 'nameInput'>
                Name of Restaurant:
                <input className = 'textInput' type="text" placeholder = "Restaurant Name" id = "name" onChange ={this.setName} required/>
              </label>   

              <label className = 'styleInput'>
                Style of Restaurant:
                <input type="text" className = 'textInput' placeholder = "Restaurant Style" id = "style" onChange ={this.setStyle} required/>
              </label>  

              <label className = 'tagsInput'> 
                Tags:
                <input type="text" className = 'textInput' placeholder = "Tags comma separated" id = "tags" onChange ={this.setTags} required/>
              </label>

              <div className = 'postButtonDiv'>
                <button className = 'postButton' onClick={this.postData}>POST</button>  
              </div>
              
            </form> 
            <form className = 'deleteForm'>
              <label className = 'deleteInput'>
                Restaurant To Delete:
                <input type="text" className = 'textInput' placeholder = "Desired Deleted Restaurant" id = "deleteId" onChange ={this.setName} required/>
              </label>
              <div className = 'deleteButtonDiv'>
                <button className = 'deleteButton' onClick={this.deleteData}>
                  DELETE
                </button>
              </div>
              
            </form>
          </div>
        
          <div id = 'showAllId'></div>
        
        </div>
      </div>
    )
  }
   
}

export default EditPage
