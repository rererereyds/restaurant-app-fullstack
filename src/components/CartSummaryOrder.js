import React, {useState} from 'react'
import PurchaseConfirmation from './PurchaseConfirmation';

const CartSummaryOrder = ({cartItems, closeModal, cartTotal, checkout}) => {

  const [openPurchaseConfirmation, setOpenPurchaseConfirmation] = useState(false);


  return (
    <div className='cart-summary-modal-background'>

      {openPurchaseConfirmation && <PurchaseConfirmation setOpenPurchaseConfirmation={setOpenPurchaseConfirmation} checkout={checkout} /> }

      <p className='cart-word'>Your Cart</p>

      <div className='cart-container'>
        {cartItems}
      </div>

      <p className='total-word'>TOTAL BILL :  {cartTotal}</p>

      <div className='btn-container'>
        <button className='cancel-cart-btn' onClick={() => closeModal(false)}>Cancel</button>
        <button className='proceed-cart-btn' onClick={() => setOpenPurchaseConfirmation(true)}>Proceed</button>
      </div>

    </div>
  )
}

export default CartSummaryOrder