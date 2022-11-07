import React from 'react'

const OrderItems = ({id, image, name, price, category, orderSubmit, quantity, addQuantity, description}) => {

  return (
    <div className='show-items-container'>

      <img className='food-pics' src = {image} alt="item" />
      <p className='food-name'>{name}</p>
      <p className='food-price'>₱ {price}</p>
      <p className='food-category'>[{category}]</p>
      <p className='food-description'>{description}</p>

      <img src='https://cdn-icons-png.flaticon.com/512/57/57493.png' alt='add to cart' className='add-to-cart-btn' onClick={() => {
        orderSubmit(id); 
        }
      }/>

    </div>
  )
}

export default OrderItems