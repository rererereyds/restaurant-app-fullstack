import React from 'react'

const CartItems = ({id, image, name, price, category, description, quantity, addCartQuantity, removeCartQuantity, removeFromCart}) => {
  return (
    <div className='major-cart-items-container'>

      <div className='cart-items-container'>
        <img className='food-pics' src = {image} alt="item" />
        <p className='food-name'>{name}</p>
        <p className='food-price'>₱ {price}</p>
        <p className='food-category'>[{category}]</p>

        <div className='quantity-container'>
          <p className='quantity-word'>Quantity:</p>
          <button className='minus-quantity-btn' onClick={() => {
              removeCartQuantity(id);
            }
          }>-</button>
          <p className='quantity'>{quantity}</p>
          <button className='plus-quantity-btn' onClick={() => {
              addCartQuantity(id);
            }
          }>+</button>
        </div>

        <p className='subtotal-word'>Subtotal: ₱ {price * quantity}</p>
        <img className='remove-btn' src='https://cdn-icons-png.flaticon.com/512/57/57480.png' alt='remove' onClick={() => {
          removeFromCart(id);
        }}/>

      </div>

    </div>
  )
}

export default CartItems