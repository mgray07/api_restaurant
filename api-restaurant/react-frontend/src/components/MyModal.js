import React from 'react'
import Modal from 'react-modal'

function MyModal() {
    console.log('inside modal')
    let dog = false
    return (
        <Modal
        //onAfterOpen={afterOpenModal}
        //onRequestClose={closeModal}
        //style={customStyles}
        //contentLabel="Example Modal"
      ><div>hi</div></Modal>
    )
}

export default MyModal
