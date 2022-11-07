import axios from 'axios';

const ShowItems = ({id, image, name, price, category, deleteItem, description, showEditItemForm, editModal}) => {

  let item = {};
  
  axios.get(`https://reyda-resto-project-api.herokuapp.com/items/${id}`).then((response) => {
    item = response.data;
  });

  return (
    <div className='show-items-container'>

      <img className='food-pics' src = {image} alt="item" />
      <p className='food-name'>{name}</p>
      <p className='food-price'>₱ {price}</p>
      <p className='food-category'>[{category}]</p>
      <p className='food-description'>{description}</p>
      
      { editModal
      ? ("")
      : (<img className='edit-btn' onClick={() => showEditItemForm(true, item)} src='https://cdn-icons-png.flaticon.com/512/32/32355.png' alt='edit' />)}
      <img className='delete-btn' src='https://cdn-icons-png.flaticon.com/512/168/168245.png' alt='delete' onClick={
        () => {
            setTimeout(function() {
              deleteItem(id);
            }, 500);
          }
      }/>
    </div>
  )
}

export default ShowItems