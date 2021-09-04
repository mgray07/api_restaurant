import React from 'react'
import RouteHome from './RouteHome'
import axios from 'axios'
import {setState} from 'react'

class Second extends React.Component {

    // deleteData = () => {
    //     if (document.getElementById('deleteId').value === '') {
    //       return
    //     }
    //     axios
    //     .delete('http://127.0.0.1:5000/', {
    //       params: {
    //         name: document.getElementById("deleteId").value.trim()
    //       }
    //     })
    //       .then(res => console.log(res))
    //       .catch(err => console.error(err));
    // }
    
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

    render () {
        return (
            <div>
                <h1>this is the second page</h1>
                <br />
                <RouteHome />
                <br />
                <div>
                    <button onClick={this.deleteData}>
                        DELETE
                    </button>
                    <br />
                </div>
            </div>
        )
    }
   
}

export default Second
