import axios from 'axios'
import React from 'react';
import {setState} from 'react'

class App extends React.Component {
  
  state = {
    name: '',
    style: '',
    tags: ''
  };
  
  setName = (event) => {
      this.setState({name: event.target.name});
      console.log(event.target.name);
  }
  setStyle = (event) => {
      this.setState({style: event.target.style});
      console.log(event.target.style);
  }
  setTags = (event) => {
    this.setState({tags: event.target.tags});
    console.log(event.target.tags);
  }

  getData() {
    axios
      .get('http://127.0.0.1:5000/')
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }
  
  postData() {
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

  deleteData() {
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
  
  
  render() {
    return (
    <div>
      <div>
        <button onClick={this.getData}>
          GET
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
