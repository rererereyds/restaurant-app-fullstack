import './App.css';
import {v4 as uuidv4} from 'uuid';
import { Link, Route, Routes } from "react-router-dom";
import SellerInterface from './components/SellerInterface';
import {useEffect, useState} from 'react';
import UserInterface from './components/UserInterface';
import ShowItems from './components/ShowItems';
import OrderItems from './components/OrderItems';
import CartItems from './components/CartItems';
import axios from 'axios';


function App() {

  ///ADD TO CART (8)
  const [orderedItems, setOrderedItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [items, setItems] = useState([]);

  ///CONNECTING THIS FRONTEND TO BACKEND (9)
  useEffect (() => {
    axios.get('https://reyda-resto-project-api.herokuapp.com/items').then((response) => {
      setItems(response.data);
    });

    axios.get('https://reyda-resto-project-api.herokuapp.com/cartItems').then((response) => {
      setOrderedItems(response.data);
    });

    axios.get('https://reyda-resto-project-api.herokuapp.com/cartItems/getTotalAmount').then((response) => {
      setCartTotal(response.data.total);
    });
  }, []); 

  ///FILTER CATEGORY (3)
  const [category, setCategory] = useState("");

  let filterItems = items.filter((item) => {
    return category === ""
    ? item
    : item.category === category;
  });

  const filterCategory = (category) => {
    setCategory(category);
  };


  const [categoryAtUI, setCategoryAtUI] = useState("");

  let filterItemsAtUI = items.filter((item) => {
    return categoryAtUI === ""
    ? item
    : item.category === categoryAtUI  ;
  });

  const filterCategoryAtUI = (category) => {
    setCategoryAtUI(category);
  };


  ///DELETING ITEM TO THE ARRAY (4)
  const deleteItem = async (id) => {

    // const updatedList = items.filter(item => item.id !== id);
    await axios.delete(`https://reyda-resto-project-api.herokuapp.com/items/${id}`, id).then((response) => {
      setItems(response.data);
    });

    await axios.delete(`https://reyda-resto-project-api.herokuapp.com/cartItems/${id}`, id).then((response) => {
      setOrderedItems(response.data);
    });

    axios.get('https://reyda-resto-project-api.herokuapp.com/getTotalAmount').then((response) => {
      setCartTotal(response.data.total);
    });

  }
  
  ///MAKING CATEGORIES DYNAMIC (5)
  const categories = items.reduce((categories, item) => {
    if(!categories.includes(item.category)){
      categories.push(item.category);
    }
    return categories
  }, []);


  const categoriesAtUI = items.reduce((categories, item) => {
    if(!categories.includes(item.category)){
      categories.push(item.category);
    }
    return categories
  }, []);


  ///EDITING ITEMS (6)
  const [editItemDetail, setEditItemDetail] = useState([]);
  const [editModal, setEditModal] = useState(false);

  const showEditItemForm = (status, item) => {
    editModal ? setEditModal(false) : setEditModal(status);  

    setEditItemDetail(item);
  };

  const hideEditItemForm = (status) => {
    editModal ? setEditModal(status) : setEditModal(status);
  }

  const saveEditedItem = (editItem) => {
    const listItems = [...items];
    listItems.filter((item) => {
      if (item.id === editItem.id) {
        item.name = editItem.name;
        item.image = editItem.image
        item.category = editItem.category
        item.description = editItem.description
      }
    });

    axios.put(`https://reyda-resto-project-api.herokuapp.com/items/${editItem.id}`, editItem).then((response) => {
      setItems(response.data);
      setEditModal(false);
    });

    axios.put(`https://reyda-resto-project-api.herokuapp.com/cartItems/${editItem.id}/edit`, editItem).then((response) => {
      setOrderedItems(response.data);
    });
    
    axios.get('https://reyda-resto-project-api.herokuapp.com/cartItems/getTotalAmount').then((response) => {
      setCartTotal(response.data.total);
    });

  };


  ///ADDING ORDER TO CART(7)
  const orderSubmit = async (id) => {
    let item = {};

    item = await axios.get(`https://reyda-resto-project-api.herokuapp.com/items/${id}`).then((response) => {
      return response.data;
    });

    await axios.post('https://reyda-resto-project-api.herokuapp.com/cartItems', item).then((response) => {
      setOrderedItems(response.data);
    });

    axios.get('https://reyda-resto-project-api.herokuapp.com/cartItems/getTotalAmount').then((response) => {
      setCartTotal(response.data.total);
    });
  };

  /////REMOVE FROM CART
  const removeFromCart = (id) => {
    const cartCopy = orderedItems.filter(item => item.id !== id);

    axios.delete(`https://reyda-resto-project-api.herokuapp.com/cartItems/${id}`, id).then((response) => {
      setOrderedItems(cartCopy);
      setOrderedItems(response.data);
    });
 
    axios.get('https://reyda-resto-project-api.herokuapp.com/cartItems/getTotalAmount').then((response) => {
      setCartTotal(response.data.total);
    });
    
  };

  ///ADDING NEW ITEM TO THE ARRAY (2)
  //newItem = tawag sa item na ipapasa
  const addItem = (newItem) => {
    newItem.price = Number(newItem.price);
    const item = {id: uuidv4(), ...newItem};
    // console.log(`hey ${item}`);

    axios.post("https://reyda-resto-project-api.herokuapp.com/items", item).then((response) => {
      // const itemsAtArray = [...items, item];
      // setItems(itemsAtArray);
      setItems(response.data);
    });
  };


  //UPDATING QUANTITY TO CART (1)
  const addCartQuantity = async (id) => {
    let item = {};

    item = await axios.get(`https://reyda-resto-project-api.herokuapp.com/items/${id}`).then((response) => {
      return response.data;
    });

    await axios.post("https://reyda-resto-project-api.herokuapp.com/cartItems", item).then((response) => {
      setOrderedItems(response.data);
    });

    axios.get('https://reyda-resto-project-api.herokuapp.com/cartItems/getTotalAmount').then((response) => {
      setCartTotal(response.data.total);
    });
  };
  
  const removeCartQuantity = async (id) => {
    let reqParam = {
      method: 'subtract',
      qty: 1
    };

    await axios.put(`https://reyda-resto-project-api.herokuapp.com/cartItems/${id}`, reqParam).then((response) => {
      console.log(response.data);
      setOrderedItems(response.data);
    });

    axios.get('https://reyda-resto-project-api.herokuapp.com/cartItems/getTotalAmount').then((response) => {
      setCartTotal(response.data.total);
    });

  };

  const checkout = async () => {
    await axios.post('https://reyda-resto-project-api.herokuapp.com/cartItems/checkout').then((response) => {
      window.location.reload();
    });
  }


  const showItems = filterItems.map((item) => (
    <ShowItems
      key = {item.id}
      id = {item.id}
      image = {item.image}
      name = {item.name}
      price = {item.price}
      category = {item.category}
      description = {item.description}
      deleteItem = {deleteItem}
      showEditItemForm = {showEditItemForm}
      editModal = {editModal}
    />
  ));

  const orderItems = filterItemsAtUI.map((item) => (
    <OrderItems
      key = {item.id}
      id = {item.id}
      image = {item.image}
      name = {item.name}
      price = {item.price}
      category = {item.category}
      description = {item.description}
      orderSubmit = {orderSubmit}
      />
  ));

  const cartItems = orderedItems.map((item) => (
    <CartItems
      key = {item.id}
      id = {item.id}
      image = {item.image}
      name = {item.name}
      price = {item.price}
      category = {item.category}
      description = {item.description}
      addCartQuantity = {addCartQuantity}
      removeCartQuantity = {removeCartQuantity}
      removeFromCart = {removeFromCart}
      quantity = {item.quantity}
  />));

  ///THE DISPLAY
  return (
    <div className='App'>
      
      <nav>
        <p className='view-word'>View app as :</p>
        <button className='link-btn'><Link to=''>Seller Interface</Link></button>
        <button className='link-btn'><Link to='userInterface'>UserInterface</Link></button>
      </nav>

      <Routes>
        <Route path='/' element={
          <SellerInterface 
            addItem={addItem} 
            showItems={showItems} 
            filterCategory={filterCategory} 
            categories={categories}
            editModal={editModal}
            details={editItemDetail}
            hideEditItemForm={hideEditItemForm} 
            saveEditedItem = {saveEditedItem} 
          />
        } ></Route>

        <Route path='/userInterface' element={
          <UserInterface 
            orderItems={orderItems} 
            filterCategoryAtUI={filterCategoryAtUI} 
            categoriesAtUI={categoriesAtUI} 
            cartItems={cartItems}
            cartTotal={cartTotal}
            checkout={checkout}
            />
          }
        />
      </Routes>

    </div>

  );
}

export default App;
