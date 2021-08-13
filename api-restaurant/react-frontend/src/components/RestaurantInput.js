import React from 'react'
import '../assets/RestaurantInput.css'

export default function RestaurantInput() {
    const restaurant = {
        "name": "chipotle",
        "style": "mexican",
        "tags": ["burrito", "taco", "queso", "beans"]
    }
    return (
        <div className = 'resInput'>

            <div className = 'input'>
                <div className = 'label'>
                    <p1>Restaurant</p1>
                    <input></input>
                </div>
                <div className = 'label'>
                    <p1>Style</p1>
                    <input></input>
                </div>
                <div className = 'label'>
                    <p1>Tags</p1>
                    <input></input>
                </div>
            </div>      
            
        </div>
    )
}
