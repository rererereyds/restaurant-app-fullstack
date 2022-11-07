import React, { useState } from 'react'
import CartSummaryOrder from './CartSummaryOrder'
import FilterItemAtUserInterface from './FilterItemAtUserInterface'

const UserInterface = ({orderItems, filterCategoryAtUI, categoriesAtUI, cartItems, cartTotal, checkout}) => {

  const [cartSummaryModal, setCartSummaryModal] = useState(false);

  return (
    <div>
      <div>

        {cartSummaryModal && <CartSummaryOrder cartItems={cartItems} closeModal={setCartSummaryModal} cartTotal={cartTotal} checkout={checkout} />}

        <div className='top-btn'>
          <div>
            <FilterItemAtUserInterface filterCategoryAtUI={filterCategoryAtUI} categoriesAtUI={categoriesAtUI} />
          </div>

          <img className='add-item-btn' src='https://cdn-icons-png.flaticon.com/512/2089/2089457.png' alt='cart' onClick={() => {setCartSummaryModal(true)}}  />
        </div>

        <p className='intro'>WELCOME TO OUR SHOP!</p>

        <div className='items-container'>
        {orderItems}
        </div>

      </div>
    </div>
  )
}

export default UserInterface