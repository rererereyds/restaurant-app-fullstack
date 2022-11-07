import React from 'react'
import AddItem from './AddItem'
import { useState } from 'react'
import FilterItem from './FilterItem';
import EditItem from './EditItem';


const SellerInterface = ({addItem, showItems, filterCategory, categories, details, hideEditItemForm, saveEditedItem, editModal}) => {

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className='SellerInterface'>

      {/* {openModal && <AddItem addItem={addItem} closeModal={setOpenModal} />} */}
      {/* <EditItem details = {editItemDetail} editItemForm = {editItemForm} saveEditedItem = {saveEditedItem}/> */}

      <div className='top-btn'>
        <div>
          <FilterItem  filterCategory={filterCategory} categories={categories} />
        </div>

        { openModal
        ? (<AddItem addItem={addItem} closeModal={setOpenModal} />)
        : (<img src='https://cdn-icons-png.flaticon.com/512/61/61183.png' alt='add' className='add-item-btn' onClick={() => {setOpenModal(true)}} />) }

        { editModal
        ? (<EditItem details = {details} saveEditedItem = {saveEditedItem} hideEditItemForm={hideEditItemForm} />)
        : ("") }

      </div>

      <p className='intro'>YOUR SHOP'S ITEMS</p>

      <div className='items-container'>
        {showItems}
      </div>

    </div>
  )

}

export default SellerInterface