import React, { createElement } from 'react'
import RouteHome from './RouteHome'
import RouteGreeting from './RouteGreeting'
import axios from 'axios'
import {setState} from 'react'
// import Dropdown from 'react-dropdown'
import "../assets/EditPage.css"
import RestaurantCard from './RestaurantCard'
//import Modal from 'react-bootstrap-modal'
import GoogleLogin from 'react-google-login'
import MyModal from './MyModal'
import Modal from 'react-modal'
import {EmailShareButton} from 'react-share'
import {EmailIcon} from 'react-share'
import RouteDirections from './RouteDirections'
import ReactStars from 'react-rating-stars-component'
import { render } from 'react-dom'
// let Modal = require('react-bootstrap-modal')
//const bootstrap = require('bootstrap')

class EditPage extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      allResults: this.props.value,
      prettyRestaurants: '',
      latitude: '',
      longitude: '',
      isOpen: false,
      rating: -1
    }
  }

  componentWillMount() {
    axios
      .get('http://127.0.0.1:5000/')
      .then(res => {
        this.setState({allResults: res.data.restaurants_backend})
        let temp = ''
        let i=1
        this.state.allResults.forEach(result => {
          temp += `${i}.\n`
          temp += `Name: ${result.name}\n`
          temp += `Style: ${result.style}\n`
          temp += `Tags: ${result.tags}\n\n`
          //temp += '-------------------------------'
          i = i + 1
        });
        this.setState({prettyRestaurants: temp})
        if(this.props.signIn1 === false)
        {
          this.showAll2()
        }
        else{
          this.showAll()
        }
        
      })
      .catch(err => console.error(err));
  }

  // handleShowMore = () => {
  //   console.log('button clicked')
  //   // let x = document.getElementById('fullPage')
  //   // x.style.backgroundColor = "blue"
  //   let restaurantCard1 = document.getElementById('restaurantCardId')
  //   // let modalDiv = createElement('div')
  //   // modalDiv.innerHTML = 'testing'
  //   restaurantCard1.innerHTML += '<div><OpenModal /></div>'
    //restaurantCard1.appendChild(modalDiv)
     //return (<openModal ref = 'openModal' />)
    
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
  //}

  closeModal = () => {
    this.setState({isOpen: false})
  }

  // openModal = () => {
  //   this.setState({isOpen: true})
  //   //console.log(name,style,tags)
  
  // }

  restaurantCard = (name, style, tags, rating) => {
    let restaurantCard = document.createElement('div')
    restaurantCard.id = 'restaurantCardId'

    let restaurantName = document.createElement('h5')
    restaurantName.id = 'restaurantNameId'
    let restaurantStyle = document.createElement('h5')
    restaurantStyle.id = 'restaurantStyleId'
    let restaurantTags = document.createElement('h5')
    restaurantTags.id = 'restaurantTagsId'
    let restaurantRating = document.createElement('h5')
    restaurantRating.id = 'restaurantRatingId'

    restaurantName.textContent = `Name: ${name}`
    restaurantStyle.textContent = `Style: ${style}`
    restaurantTags.textContent = `Tags: ${tags}`
    if (rating == -1){
      restaurantRating.textContent = `No Rating Applied`
    }
    else{ 
      restaurantRating.textContent = `Rating: ${rating}`
    }
    
    
    //let tagsDiv = document.createElement('div')
    //tagsDiv.id = 'tagsDivId'
    let openMoreDiv = document.createElement('div')
    let openMore = document.createElement('button') 
    // let handleShowMore
    // openMore.onclick = handleShowMore = () => {
    //   console.log('hi')
    //   let myModal = document.getElementById('restaurantCardId')
    //   //let modal2 = document.createElement('div')
    //   //let test3 = document.createElement('<Modal/>')
    //   //myModal.appendChild(test3)
    //   console.log(MyModal())
    //   //modal2.appendChild(Modal())
    //   //myModal.insertAdjacentHTML('beforeend', MyModal())
    //   return 0
    // }
    //openMore.onclick = this.openModal
    
      openMore.onclick = () => {
      this.setState({isOpen: true})
      console.log(name,style,tags)
      let modalName = document.getElementById('modalName')
      let modalStyle = document.getElementById('modalStyle')
      let modalTags = document.getElementById('modalTags')
      let modalRating = document.getElementById('modalRating')

      modalName.textContent = `Name: ${name}`
      modalStyle.textContent = `Style: ${style}`
      modalTags.textContent = `Tags: `
      if (rating == -1) {
        modalRating.textContent = 'No Rating Applied'
      }
      else {
        modalRating.textContent = `Rating: ${rating}`
      }

    tags.map((item) => {
      let modalTags = document.getElementById('modalTags')
      let x = document.createElement('h5')
      x.textContent = item
      x.style.backgroundColor = "cyan"
      x.style.border = 'solid'
      x.style.padding = '10px'
      x.style.margin = '5px'

      modalTags.appendChild(x)
    })



      //modalTags.textContent = `Tags: ${tags}`
      
      
    }
    
    openMore.id = 'openMoreId'
    openMoreDiv.id = 'openMoreDivId'
    openMore.textContent = 'Show More'
    openMoreDiv.appendChild(openMore)

    let getDirectionLink = document.createElement('a')
    getDirectionLink.id = 'directionLinkId'
    getDirectionLink.href = `https://www.google.com/maps/search/${name}/@${this.state.latitude},${this.state.longitude},20z`
    getDirectionLink.target = "_blank"
    getDirectionLink.rel = "noopener noreferrer"
    getDirectionLink.textContent = "Get Directions"
    restaurantCard.appendChild(getDirectionLink)
    
    // tagsDiv.appendChild(restaurantTags)
    // tagsDiv.appendChild(openMore)
    

    
    
    restaurantCard.appendChild(restaurantName)
    restaurantCard.appendChild(restaurantStyle)
    restaurantCard.appendChild(restaurantTags)
    restaurantCard.appendChild(restaurantRating)
    restaurantCard.appendChild(openMoreDiv)
    

    return restaurantCard
  }

  customStyles = {
    content: {
      top: '50%',
      width: '50vh',
      height: '50vh',
      left: '50%',
      right: 'auto',
      backgroundColor: 'peachpuff',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      //padding: '5px'
    },
  };

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
      let tmp1 = this.restaurantCard(result.name, result.style, result.tags, result.rating)
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

  showAll2 = () => {
    //console.log(this.state.allResults)
    let showAllOutput = document.getElementById('showAllId2')
    let listOutput = document.createElement('div')
    listOutput.id = 'listOutputId'
    let emptyCase = document.createElement('h5')
    emptyCase.textContent = 'No Restaurants Added Yet'
    let i = 0
    
    this.state.allResults.map((result) => {
      //console.log(<RestaurantCard name = {result.name} style = {result.style} tags = {result.tags}/>)
      let tmp1 = this.restaurantCard(result.name, result.style, result.tags, result.rating)
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
      console.log('deleting blank')
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
    console.log(this.state.rating)
    axios
    .post('http://127.0.0.1:5000/', {
      data: {
        name: document.getElementById("name").value.trim(),
        style: document.getElementById("style").value.trim(),
        tags: tempo,
        rating: this.state.rating
      }
    })
    .then(res => {console.log(res);
      this.setState({rating: -1})}
    )
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

  
  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoord);
    //   console.log(position.coords.latitude)
    //   console.log(position.coords.longitude)
    } else {
        console.log('error')
    }
  }
  
  getCoord = (position) => {
    this.setState({latitude: position.coords.latitude})
    this.setState({longitude: position.coords.longitude})

    console.log(position.coords.latitude)
    console.log(position.coords.longitude)
  }
  
  ratingChanged = (newRating) => {
    this.setState({rating: newRating})
  }
  

  render () {
    const options = ['name', 'style', 'tags']
    {this.getLocation()}
    // NOT SIGNED IN
    if(this.props.signIn1 === false){
      return (
        <div id = 'fullPage'>
          {/* <OpenModal /> */}
          <div className = 'entirePage'>
          <Modal id = 'modalId' isOpen={this.state.isOpen} onRequestClose={this.closeModal} contentLabel="hi" style = {this.customStyles}>
              <h5 id = 'modalName'></h5>
              <h5 id = 'modalStyle'></h5>
              <h5 id = 'modalTags'></h5>
              <h5 id = 'modalRating'></h5>
              <div id = 'modalButtonDiv'>
                <button id = 'modalCloseButton' onClick = {this.closeModal}> close </button>
              </div>
            </Modal>
            <div className = 'routeHome'>
              <RouteHome />
              <EmailShareButton url="" subject="My Restaurant List" body= {`Hey Friend,\n\nHere is my restaurant list:\n${this.state.prettyRestaurants}\n\nTry them out if you get a chance!\n\nEnjoy!\n\n`} >
              <EmailIcon size = {50} logoFillColor="white" round={true}>

              </EmailIcon>
            </EmailShareButton>
            </div>
        
            <div className = 'Header'>
            
              <h1>Restaurant Finder</h1>
              
            </div>

            <div id = 'showAllId2'></div>
            
          </div>
        </div>
      )
    }
    // SIGNED IN
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    else{
      return (
      <div id = 'fullPage'>
        {/* <OpenModal /> */}
        {console.log('loggedIn')}
        <div className = 'entirePage'>
        <Modal id = 'modalId' isOpen={this.state.isOpen} onRequestClose={this.closeModal} contentLabel="hi" style = {this.customStyles}>
              <h5 id = 'modalName'></h5>
              <h5 id = 'modalStyle'></h5>
              <div id = 'modalTags'></div>
              <h5 id = 'modalRating'></h5>
              <div id = 'modalButtonDiv'>
                <button id = 'modalCloseButton' onClick = {this.closeModal}> X </button>
              </div>
        </Modal>
        <div className = 'routeHome'>
          <RouteHome />
          <EmailShareButton url="" subject="My Restaurant List" body= {`Hey Friend,\n\nHere is my restaurant list:\n${this.state.prettyRestaurants}\n\nTry them out if you get a chance!\n\nSincerely,\n\n _________`} >
            <EmailIcon size = {50} logoFillColor="white" round={true}>

            </EmailIcon>
          </EmailShareButton>
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
              <label className = 'ratingLabel'>
                Rating:
                <ReactStars
                count={5}
                onChange={this.ratingChanged}
                size={24}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
                className = 'ratingInput'
                id = "ratingId"
              />
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
          <div id = 'routeDirections'>
            {/* <RouteDirections/> */}
          </div>
        </div>
      </div>
      </div>
      
    )
    }
    
  }
   
}

export default EditPage
