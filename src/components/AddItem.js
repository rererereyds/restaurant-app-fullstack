import React, { useState } from 'react'

const AddItem = ({addItem, closeModal}) => {

  const [item, setItem] = useState ([
    {
      image : '',
      name : '',
      price: 0,
      category: '',
      description: '',
    }
  ]);
  console.log(item)

  const onChange = (e) => {
    
    const inputName = e.target.name;

    switch(inputName){
      case "image":
        setItem({
          ...item,
          image: e.target.value
        });
        break;
      case "name":
        setItem({
          ...item,
          name: e.target.value
        });
        break;
      case "price":
        setItem({
          ...item,
          price: e.target.value
        });
        break;
      case "category":
        setItem({
          ...item,
          category: e.target.value
        });
        break;
      case "description":
        setItem({
          ...item,
          description: e.target.value
        });
        break;
      default:
        break;
    }

  }

  const addItemSubmit = (e) => {
    e.preventDefault();
    closeModal(false);
    addItem(item);
  }

  return (
    <div className='add-item-modal-background'>

      <div className='add-item-container'>
        <button className='x-btn' onClick={() => closeModal(false)}>x</button>
        
        <p className='add-text'>Add item to your shop:</p>

        <p className='fillup-intro'>Image:</p>
        <input className='input-box' type='textbox' name='image' onChange={onChange} />

        <p className='fillup-intro'>Name:</p>
        <input className='input-box' type='textbox' name='name' onChange={onChange} />

        <p className='fillup-intro'>Price:</p>
        <input className='input-box' type='number' name='price' onChange={onChange}  />

        <p className='fillup-intro'>Category:</p>
        <input className='input-box' type='textbox' name='category' onChange={onChange}  />

        <p className='fillup-intro'>Description:</p>
        <input className='input-box' type='textbox' name='description' onChange={onChange}  />

        <br/>
        <button className='cancel-btn' onClick={() => closeModal(false)}>Cancel</button>
        <button className='add-btn' onClick={addItemSubmit}>Add</button>
      </div>

    </div>
  )

}

export default AddItem