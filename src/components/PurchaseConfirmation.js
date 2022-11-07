import React from 'react'

const PurchaseConfirmation = ({setOpenPurchaseConfirmation, checkout}) => {

  return (
    <div className='purchase-confirmation-modal-background'>

      <div className='confirmation-container'>

        <div className='confirmation-text'>
          <p className='confirm-word'>Purchase Confirmed!</p>
          <div className='ending-word-container'>
            <p className='ending-word'>Gracias mi Amigo / Amiga!</p>
            <p className='ending-word'>Your order will take 1-2 hrs to prepare.</p>
            <p className='ending-word'>Hope you enjoy your purchased Mexican delicacies!</p>
          </div>
          <button className='okay-btn' onClick={() => {
            setOpenPurchaseConfirmation(false);
            checkout();
          }}>Okay</button>
        </div>

        <div>
          <img className='taco-image' src='https://cdn-icons-png.flaticon.com/512/189/189149.png' alt='ending image' />
        </div>

      </div>

    </div>
  )
}

export default PurchaseConfirmation