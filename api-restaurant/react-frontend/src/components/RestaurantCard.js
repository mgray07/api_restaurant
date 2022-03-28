import React from 'react'

function RestaurantCard(props) {
    let restaurantCard = document.createElement('div')

    let restaurantName = document.createElement('h5')
    let restaurantStyle = document.createElement('h5')
    let restaurantTags = document.createElement('h5')

    restaurantName.textContent = props.name
    restaurantStyle.textContent = props.style
    restaurantTags.textContent = props.tags

    restaurantCard.appendChild(restaurantName)
    restaurantCard.appendChild(restaurantStyle)
    restaurantCard.appendChild(restaurantTags)

    return (restaurantCard)
}

export default RestaurantCard
