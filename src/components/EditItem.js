import React, { useState } from 'react';

const EditItem = ({details, saveEditedItem, hideEditItemForm}) => {

  const [editItem, setEditItem] = useState (
    {
      id: details.id,
      image : details.image,
      name : details.name,
      category: details.category,
      description: details.description
    }
  );

  const onChange = (e) => {
    
    const inputName = e.target.name;

    switch(inputName){
      case "image":
        setEditItem ({...editItem, image : e.target.value});
        break;
      case "name":
        setEditItem ({...editItem, name : e.target.value});
        break;
      case "category":
        setEditItem ({...editItem, category : e.target.value});
        break;
      case "description":
        setEditItem ({...editItem, description : e.target.value});
        break;
      default:
        break;
    }
  }

  const editItemSubmit = (e) => {
    e.preventDefault();
    saveEditedItem(editItem);
  }

  const hideForm = (e) => {
    e.preventDefault();
    hideEditItemForm(false);
  }

  return (
    <div className='add-item-modal-background'>

      <div className='add-item-container'>
        <button className='x-btn' onClick={hideForm}>x</button>
        <p className='add-text'>Edit data:</p>

        <p className='fillup-intro'>Image:</p>
        <input className='input-box' type='text' name='image' value={editItem.image} onChange={onChange} />

        <p className='fillup-intro'>Name:</p>
        <input className='input-box' type='text' name='name' value={editItem.name} onChange={onChange} />

        <p className='fillup-intro'>Category:</p>
        <input className='input-box' type='text' name='category' value={editItem.category} onChange={onChange} />

        <p className='fillup-intro'>Description:</p>
        <input className='input-box' type='text' name='description' value={editItem.description} onChange={onChange} />

        <br/>
        <input name='id' value={editItem.id} type='hidden' />
        <button className='cancel-btn' onClick={hideForm}>Cancel</button>
        <button className='add-btn' onClick={editItemSubmit}>Save</button>

      </div>
    </div>
  )
}

export default EditItem